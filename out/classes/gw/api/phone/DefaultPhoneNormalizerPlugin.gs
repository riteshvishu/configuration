package gw.api.phone

uses java.util.Map
uses java.util.List
uses java.util.regex.Pattern
uses java.lang.StringBuilder
uses gw.plugin.phone.IPhoneNormalizerPlugin
uses gw.api.util.phone.GWPhoneNumber
uses gw.api.util.PhoneUtil

uses gw.api.util.phone.EntityPhoneMapper
uses gw.entity.IEntityType
uses java.util.HashMap
uses java.util.ArrayList
uses gw.util.concurrent.LockingLazyVar

uses org.apache.commons.lang.StringUtils

uses gw.lang.reflect.ReflectUtil

uses gw.api.archiving.upgrade.IArchivedEntity
uses gw.api.util.phone.PhoneColumnProperties
uses gw.api.archiving.upgrade.IArchivedTypekey

uses com.guidewire.pl.domain.archiving.upgrade.ArchivedDocumentUpgradeContext
uses gw.api.system.PLLoggerCategory
uses java.lang.Throwable
uses java.lang.StringBuffer


@Export
class DefaultPhoneNormalizerPlugin implements IPhoneNormalizerPlugin{

  static final var STAR_SIGN = '*'
  static final var PLUS_SIGN = '+'
  static final var MIN_LENGTH_FOR_NSN = 2
  static final var DIGITS = "\\p{Nd}"

  static final var VALID_ALPHA = "0-9"          //Disable alpha support valid mappings to digits unlike libphonenumber
  static final var PLUS_CHARS = "+\uFF0B"
  static final var EXTN_SYMBOLS = ",x\uFF58#\uFF03~\uFF5E"

  static final var VALID_PUNCTUATIONS = "-\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F " +
      "\u00A0\u00AD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E";

  static final var VALID_PUNCTUATIONS_W_EXTN = "-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F " +
  "\u00A0\u00AD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E";

  //looser version of libphonenumber's extension, use this version if you did not customize your extension separator
  /*
  static final var EXTN = ";ext=(" + DIGITS + "{1,})|" + "[ \u00A0\\t,]*" +
      "(?:e?xt(?:ensi(?:o\u0301?|\u00F3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|" +
      "[" + EXTN_SYMBOLS + "]|int|anexo|\uFF49\uFF4E\uFF54)" +
      "[:\\.\uFF0E]?[ \u00A0\\t,-]*(" + DIGITS + "{1,})#?|" +
      "[- ]+(" + DIGITS + "{1,})#";
  */

  //Use this version if you've customized your extension separator.
  static final var EXTN = "(\\P{Nd})+\\s+(\\p{Nd}{1,})"
  static final var CUSTOMIZED_EXTN_SEPARATOR = ""

  static final var POSSIBLE_PHONE_NUMBER =
      DIGITS + "{" + MIN_LENGTH_FOR_NSN + "}" + "|" +
          "[" + PLUS_CHARS + "]*+(?:[" + VALID_PUNCTUATIONS + STAR_SIGN + "]*" + DIGITS + "){3,}[" +
          VALID_PUNCTUATIONS + STAR_SIGN + VALID_ALPHA + DIGITS + "]*"



  static final var POSSIBLE_PHONE_NUMBER_WITH_EXTENSION = DIGITS + "{" + MIN_LENGTH_FOR_NSN + "}" + "|" +
      "[" + PLUS_CHARS + "]*+(?:[" + VALID_PUNCTUATIONS_W_EXTN + STAR_SIGN + "]*" + DIGITS + "){3,}[" +
      VALID_PUNCTUATIONS_W_EXTN + STAR_SIGN + VALID_ALPHA + DIGITS + "]*" + "(?:" + EXTN + ")?"

  //replace everything that's not a number, plus or star character
  static final var NORMALIZER = "[^\\d^\\+^\\*]"


  static final var MAXIMUM_EXTENSION_LENGTH = 4

  static final var VALID_EXTN = DIGITS + "{1,"  + MAXIMUM_EXTENSION_LENGTH + "}"


  static final var NORMALIZER_PATTERN =
                                Pattern.compile(NORMALIZER)
  static final var POSSIBLE_PHONE_NUMBER_PATTERN =
                                Pattern.compile(POSSIBLE_PHONE_NUMBER, Pattern.UNICODE_CASE | Pattern.CASE_INSENSITIVE)
  static final var POSSIBLE_PHONE_NUMBER_EXTENSION_PATTERN =
                                Pattern.compile(POSSIBLE_PHONE_NUMBER_WITH_EXTENSION, Pattern.UNICODE_CASE | Pattern.CASE_INSENSITIVE)

  static final var VALID_EXT_PATTERN =
                                Pattern.compile(VALID_EXTN, Pattern.UNICODE_CASE | Pattern.CASE_INSENSITIVE)

  static final var PHONE_MAPPER : LockingLazyVar<Map<IEntityType, List<EntityPhoneMapper>>> = new LockingLazyVar<Map<IEntityType, List<EntityPhoneMapper>>>(){
    override public function init() : Map<IEntityType, List<EntityPhoneMapper>>{
      var phoneMapper = new HashMap<IEntityType, List<EntityPhoneMapper>>()

      var contactPhoneMapper = new EntityPhoneMapper(Contact)
          .withPhoneColumns("FaxPhoneCountry", "FaxPhone", "FaxPhoneExtension")
          .withPhoneColumns("HomePhoneCountry", "HomePhone", "HomePhoneExtension")
          .withPhoneColumns("WorkPhoneCountry", "WorkPhone", "WorkPhoneExtension")

      var personPhoneMapper = new EntityPhoneMapper(Person)
          .withPhoneColumns("CellPhoneCountry", "CellPhone", "CellPhoneExtension")

      var mapperListPhone : List<EntityPhoneMapper> = new ArrayList<EntityPhoneMapper>()
      mapperListPhone.add(contactPhoneMapper)
      mapperListPhone.add(personPhoneMapper)

      phoneMapper.put(Contact,java.util.Collections.unmodifiableList(mapperListPhone))
      return phoneMapper
    }
  }


  static final var PARTITION_SIZE = 100
  static final var BUNDLE_SIZE = 100


  override property get WorkItemPartitionSize(): int{
    return PARTITION_SIZE
  }

  override property get BundleSize(): int{
    return BUNDLE_SIZE
  }

  override property get MaximumExtensionLength() : int{
    return MAXIMUM_EXTENSION_LENGTH
  }

  override function getEntityPhoneMapperForIEntityType(type: IEntityType) : List<EntityPhoneMapper> {
    return PHONE_MAPPER.get().get(type)
  }

  override property get EntityPhoneMapperEntries() : Map<IEntityType, List<EntityPhoneMapper>>{
    return PHONE_MAPPER.get()
  }


  override function isPossibleNumber(value : String) : boolean {
    if (value == null || value.isEmpty()){
      return true
    }
    //This assumes the first character is numeric
    return POSSIBLE_PHONE_NUMBER_PATTERN.matcher(value).matches()
  }

  override function isValidExtension(value : String) : boolean {
    if (value == null || StringUtils.isEmpty(value)){
      return true;
    }

    return VALID_EXT_PATTERN.matcher(value).matches();
  }

  override function isPossibleNumberWithExtension(value : String) : boolean {
    if (value.isEmpty()){
      return true
    }
    return POSSIBLE_PHONE_NUMBER_EXTENSION_PATTERN.matcher(value).matches()
  }

  override function normalizeNumberIfPossible(value : String) : String {
    if (value == null){
      return null
    }

    var retVal = value
    if (isPossibleNumber(value)){
      var sb = new StringBuffer(value.length)
      var matcher = NORMALIZER_PATTERN.matcher(value)
      while(matcher.find()){
        var replace = ""
        matcher.appendReplacement(sb, "")
      }
      matcher.appendTail(sb)
      retVal = sb.toString()
    }else{
      var t = new Throwable()
      PLLoggerCategory.GLOBALIZATION_PHONE_VIABLENUMBER.error(displaykey.Java.PhoneUtil.Error.ViabilityError(value),t)
    }
    return retVal
  }

  override function parsePhoneNumber(value : String) : GWPhoneNumber {
    if (!CUSTOMIZED_EXTN_SEPARATOR.isEmpty()){
        value = value.replace(CUSTOMIZED_EXTN_SEPARATOR, "x")
    }
    var gwPhone = PhoneUtil.parse(value, PhoneUtil.getDefaultPhoneCountryCode())

    if (gwPhone != null && !gwPhone.Possible && gwPhone.CountryCode != PhoneCountryCode.TC_ZZ){
      gwPhone = gwPhone.setCountryCode(PhoneCountryCode.TC_UNPARSEABLE)
    }

    return gwPhone
  }

  override function formatPhoneNumber(phoneValue : GWPhoneNumber) : String {
    return phoneValue.formatWithLocalizedExtension(PhoneUtil.getDefaultPhoneCountryCode())
  }


  override function normalizePhoneNumbersInBean(bean : KeyableBean){
    final var mapperList = getEntityPhoneMapperForIEntityType(bean.IntrinsicType.RootType)
    for (var mapper in mapperList){
      for (var columnProps in mapper.ColumnList){
        var countryCodeProperty = columnProps.PhoneCountryCode
        var phoneProperty = columnProps.PhoneNumber
        var extensionProperty = columnProps.PhoneExtension

        var phoneCountry = getObjectProperty(bean, countryCodeProperty.PropertyInfo.Name) as PhoneCountryCode
        if (phoneCountry == null || phoneCountry == PhoneCountryCode.TC_UNPARSEABLE){
          var phoneNumber = getObjectProperty(bean, phoneProperty.PropertyInfo.Name) as String
          if (phoneNumber != null){
            var gwPhoneNumber = parsePhoneNumber(phoneNumber)

            if (gwPhoneNumber != null && isPossibleNumberWithExtension(phoneNumber) && gwPhoneNumber.Possible){
              countryCodeProperty.set(bean, gwPhoneNumber.CountryCode)
              phoneProperty.set(bean, gwPhoneNumber.NationalNumber)
              if (!StringUtils.isEmpty(gwPhoneNumber.Extension)){
                extensionProperty.set(bean, gwPhoneNumber.Extension)
              }
            }else{
              if (phoneCountry != PhoneCountryCode.TC_UNPARSEABLE){
                PLLoggerCategory.GLOBALIZATION_PHONE_NORMALIZER.error(generateErrorMessage(bean, columnProps))
                countryCodeProperty.set(bean,PhoneCountryCode.TC_UNPARSEABLE)
              }
            }
          }
        }
      }
    }

  }

  override function normalizePhoneNumbersInArchive(archive : IArchivedEntity, columnProperties : List<PhoneColumnProperties>) {
    for (columns in columnProperties){

      var countryCodeProperty = columns.PhoneCountryCode
      var phoneProperty = columns.PhoneNumber
      var extensionProperty = columns.PhoneExtension

      var phoneCountry = archive.hasPropertyValue(countryCodeProperty.PropertyInfo.Name)
          ? archive.getPropertyValue(countryCodeProperty.PropertyInfo.Name)
          : null

      if (phoneCountry == null || phoneCountry == PhoneCountryCode.TC_UNPARSEABLE){

        
        if (archive.hasPropertyValue(phoneProperty.PropertyInfo.Name)){
          var phoneNumber = archive.getPropertyValue(phoneProperty.PropertyInfo.Name) as String
          
          if (phoneNumber != null){
            var gwPhoneNumber = parsePhoneNumber(phoneNumber)

            if (gwPhoneNumber != null && isPossibleNumberWithExtension(phoneNumber) && gwPhoneNumber.Possible){
              archive.updatePropertyValue(countryCodeProperty.PropertyInfo.Name, getTypeKeyArchive("PhoneCountryCode",gwPhoneNumber.CountryCode.Code))

              if (gwPhoneNumber.CountryCode == PhoneCountryCode.TC_ZZ){
                archive.updatePropertyValue(phoneProperty.PropertyInfo.Name, normalizeNumberIfPossible(phoneNumber))
              }else{
                archive.updatePropertyValue(phoneProperty.PropertyInfo.Name, gwPhoneNumber.NationalNumber)
              }

              if (!StringUtils.isEmpty(gwPhoneNumber.Extension)){
                archive.updatePropertyValue(extensionProperty.PropertyInfo.Name, gwPhoneNumber.Extension)
              }

            } else {
              if ( phoneCountry != PhoneCountryCode.TC_UNPARSEABLE ){
                archive.updatePropertyValue(countryCodeProperty.PropertyInfo.Name, getTypeKeyArchive("PhoneCountryCode",PhoneCountryCode.TC_UNPARSEABLE.Code))
              }
            }  
          }
        }
      }
    }
  }

  private function getTypeKeyArchive(typelistName: String, typecode : String) : IArchivedTypekey {
    var typeKeySet = ArchivedDocumentUpgradeContext.getActiveContext().getArchivedTypekeySet(typelistName)
    var typeKey = typeKeySet.findTypekey(typecode)

    if (typeKey == null){
      typeKey = typeKeySet.createTypekey(typecode)
    }
    return typeKey
  }


  private function getObjectProperty(bean : KeyableBean, prop : String) : Object{
    var result : Object
    if (bean != null && bean.IntrinsicType != null){
        var propObj = ReflectUtil.findProperty(bean.IntrinsicType, prop)
        if (propObj != null){
          result = bean[prop]
        }
      }


    return result
  }

  private function generateErrorMessage(bean : KeyableBean, columnProps : PhoneColumnProperties) : String{
    var sb = new StringBuilder()
    var phoneNumber = columnProps.getPhoneNumber().get(bean);

    sb.append("public_id,");
    sb.append(bean.getPublicID());
    sb.append(";");
    sb.append("display_name,");
    sb.append(bean.getDisplayName());
    sb.append(";");
    sb.append("phone_number_column");
    sb.append(columnProps.getPhoneNumber().getPropertyInfo().getName());
    sb.append(";");
    sb.append("phone_number,");
    sb.append(phoneNumber);

    return sb.toString();
  }
}

