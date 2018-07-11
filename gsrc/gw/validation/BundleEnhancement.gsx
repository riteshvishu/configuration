package gw.validation

uses gw.pl.persistence.core.Bundle
uses com.guidewire.pl.system.bundle.validation.BundleValidationOption
uses gw.entity.IEntityType
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.FieldConversionException

enhancement BundleEnhancement : Bundle {
  function turnOffValidation(): Bundle {
    com.guidewire.pc.system.bundle.BundleUtil.turnOffBundleValidation(this)
    return this
  }

  /**
   * Loads and returns an entity of type <code>type</code> whose PublicID is <code>publicID</code>.
   * Throws a {@link RequiredFieldException} if <code>publicID</code> is null, with a reference to
   * <code>fieldName</code> in the exception message. Throws a {@link FieldConversionException} if
   * no matching entity is found.
   */
  function loadByPublicIdOrThrow(type : IEntityType, publicID : String, fieldName : String) : KeyableBean {
    if (publicID == null) {
      throw new RequiredFieldException("Required field \"" + fieldName + "\" is null")
    }
    var entity = this.loadByPublicId(type, publicID)
    if (entity == null) {
      throw new FieldConversionException("Could not find PolicyCenter entity of type \"" + type + "\" with PublicID \"" + publicID + "\"")
    }
    return entity
  }
}
