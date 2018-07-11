package gw.command.critical

uses gw.api.builder.AccountBuilder
uses gw.api.builder.AccountContactBuilder
uses gw.api.builder.AccountLocationBuilder
uses gw.api.builder.CoverageBuilder
uses gw.api.builder.DriverBuilder
uses gw.api.builder.PolicyLineBuilderBase
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.builder.PersonBuilder
uses gw.api.builder.ProducerCodeBuilder
uses gw.api.builder.SubmissionBuilder
uses gw.api.databuilder.ba.BAJurisdictionBuilder
uses gw.api.databuilder.ba.BAVehicleBuilder
uses gw.api.databuilder.ba.BusinessAutoLineBuilder
uses gw.api.databuilder.bop.BOPBuildingBuilder
uses gw.api.databuilder.bop.BOPLineBuilder
uses gw.api.databuilder.bop.BOPLocationBuilder
uses gw.api.databuilder.cp.CommercialPropertyLineBuilder
uses gw.api.databuilder.cp.CPBuildingBuilder
uses gw.api.databuilder.cp.CPLocationBuilder
uses gw.api.databuilder.gl.GeneralLiabilityLineBuilder
uses gw.api.databuilder.gl.GLExposureBuilder
uses gw.api.databuilder.im.IMLocationBuilder
uses gw.api.databuilder.im.IMSignBuilder
uses gw.api.databuilder.im.IMSignPartBuilder
uses gw.api.databuilder.im.InlandMarineLineBuilder
uses gw.api.databuilder.pa.PAVehicleBuilder
uses gw.api.databuilder.pa.PersonalAutoLineBuilder
uses gw.api.databuilder.pa.PolicyDriverBuilder
uses gw.api.databuilder.pa.VehicleDriverBuilder
uses gw.api.databuilder.wc.WCCoveredEmployeeBuilder
uses gw.api.databuilder.wc.WCSubmissionBuilder
uses gw.api.databuilder.wc.WorkersCompLineBuilder
uses gw.command.critical.KeyGenerator
uses gw.pl.persistence.core.Bundle
uses gw.transaction.Transaction
uses gw.api.databuilder.cpp.CPPSubmissionBuilder
uses gw.api.database.Query
uses gw.api.databuilder.wc7.WC7CoveredEmployeeBuilder
uses gw.api.databuilder.wc7.WC7SubmissionBuilder
uses gw.api.databuilder.wc7.WC7SubmissionBuilderHelper
uses gw.api.databuilder.wc7.WC7JurisdictionBuilder
uses gw.api.databuilder.wc7.WC7WorkersCompLineBuilder

class SamplePolicyGenerator {
  
  construct() {
  }
  
  public static function getProducerCode() : ProducerCode {
    var query = new Query<ProducerCode>(ProducerCode)
    var results = query.select().orderByDescending(\ p -> p.CreateTime)
    var producerCode = results.FirstResult
    if(producerCode == null){
      Transaction.runWithNewBundle(\ bundle -> {
        producerCode = new ProducerCodeBuilder()
          .withPublicId("pctest:1")
          .withCode("Test Code")
          .create(bundle)
      })
    }
    return producerCode
  }
  
  static function wPALine() : PolicyPeriod {
    var period : PolicyPeriod
    Transaction.runWithNewBundle(\ bundle -> {
      var accountLocationBuilder = new AccountLocationBuilder()
      var driverBuilder = new DriverBuilder()
      var driverAccountContact = new AccountContactBuilder()
        .withDefaultContact()
        .withRole(driverBuilder)
      var account = new AccountBuilder()
        .withAccountLocation(accountLocationBuilder)
        .withAccountContact(driverAccountContact)
      var vehicleDriverBuilder = new VehicleDriverBuilder().withPercentageDriven(100)
      var vehicleBuilder = new PAVehicleBuilder().withVehicleDriver(vehicleDriverBuilder)
      var policyDriverBuilder = new PolicyDriverBuilder()
         .withAccountContactRole(driverBuilder)
         .withVehicleDriver(vehicleDriverBuilder)
      var lineBuilder = new PersonalAutoLineBuilder()
          .withVehicle(vehicleBuilder)
          .withPolicyDriver(policyDriverBuilder)
      period = new SubmissionBuilder()
        .withAccount(account)
        .withProduct("PersonalAuto")
        .withBillingMethod(BillingMethod.TC_DIRECTBILL)
        .withProducerCodeOfRecord(getProducerCode())
        .withPolicyContactRole(policyDriverBuilder)
        .withPolicyLine(lineBuilder)
        .isDraft()
        .create(bundle)
      period.PaymentPlanID = "pctest:2"
      period.PaymentPlanName = "Testing Payment Plan"
    })
    return period
  }
  
  static function wWCLine() : PolicyPeriod {
    var period : PolicyPeriod
    Transaction.runWithNewBundle(\ bundle -> {
      var wcLineBuilder = new WorkersCompLineBuilder()
        .withWCCoveredEmployee(new WCCoveredEmployeeBuilder())
      var account = new AccountBuilder()
        .withAccountNumber(KeyGenerator.nextString())
        .create(bundle)
      period = new WCSubmissionBuilder()
          .withAccount(account)
          .withBillingMethod(BillingMethod.TC_DIRECTBILL)
          .withReportingPattern("ReportCalendarMonthExclLast")
          .withPolicyLine(wcLineBuilder)
          .withProducerCodeOfRecord(getProducerCode())
          .withReportingPlan()
          .isDraft()
          .create(bundle)
       period.PaymentPlanID = "ReportingPlanId"
       period.PaymentPlanName = displaykey.Web.Demo.Billing.DemoReportingPaymentPlan
    })
    return period
  }
  
  static function wWC7Line() : PolicyPeriod {
    var period : PolicyPeriod
    Transaction.runWithNewBundle(\ bundle -> {
      var accountLocationBuilder = new AccountLocationBuilder()
        .withState(new WC7SubmissionBuilderHelper().State)
        .withCity(new WC7SubmissionBuilderHelper().City)
        .withPostalCode(new WC7SubmissionBuilderHelper().PostalCode)
      var account = new AccountBuilder()
        .withPrimaryLocation(accountLocationBuilder)
        .withAccountNumber(KeyGenerator.nextString())
        .create(bundle)
      period = new WC7SubmissionBuilder()
          .withAccount(account)
          .withBillingMethod(BillingMethod.TC_DIRECTBILL)
          .withReportingPattern("ReportCalendarMonthExclLast")
          .withProducerCodeOfRecord(getProducerCode())
          .withReportingPlan()
          .withBaseState(new WC7SubmissionBuilderHelper().State)          
          .isDraft()
          .create(bundle)
       period.PaymentPlanID = "ReportingPlanId"
       period.PaymentPlanName = displaykey.Web.Demo.Billing.DemoReportingPaymentPlan
    })
    return period
  }  
  
  static function wWC7InAllTestStates() : PolicyPeriod {  // for more comprehensive testing (currently FL, GA and MO)
    var period : PolicyPeriod
    Transaction.runWithNewBundle(\ bundle -> {
      var flAccountLocation = new AccountLocationBuilder().withState(State.TC_FL).withName("Florida Loc").withCity("Miami").withPostalCode("33109")
      var gaAccountLocation = new AccountLocationBuilder().withState(State.TC_GA).withName("Georgia Loc").withCity("Atlanta").withPostalCode("30317")
      var moAccountLocation = new AccountLocationBuilder().withState(State.TC_MO).withName("Missouri Loc").withCity("Springfield").withPostalCode("65801")
      var gaPolicyLocation = new PolicyLocationBuilder().withAccountLocation(gaAccountLocation)
      var moPolicyLocation = new PolicyLocationBuilder().withAccountLocation(moAccountLocation)
      var accountBuilder = new AccountBuilder()
        .withAccountNumber(KeyGenerator.nextString())
        .withPrimaryLocation(flAccountLocation)  // set FL as the primary and let the default builder behavior create the jurisdictions and exposures
        .withAccountLocation(gaAccountLocation)
        .withAccountLocation(moAccountLocation)
      period = new WC7SubmissionBuilder()
          .withAccount(accountBuilder)
          .withBillingMethod(BillingMethod.TC_DIRECTBILL)
          .withReportingPattern("ReportCalendarMonthExclLast")
          .withProducerCodeOfRecord(getProducerCode())
          .withReportingPlan()
          .withBaseState(State.TC_FL)
          .isDraft()
          .withPolicyLocation(gaPolicyLocation)
          .withPolicyLocation(moPolicyLocation)
          .withJurisdiction(new WC7JurisdictionBuilder(Jurisdiction.TC_GA))
          .withJurisdiction(new WC7JurisdictionBuilder(Jurisdiction.TC_MO))
          .withPolicyLine(new WC7WorkersCompLineBuilder()
              .withWC7CoveredEmployee(new WC7CoveredEmployeeBuilder().withClassCode("0079").withPayroll(20000).withLocation(gaPolicyLocation))
              .withWC7CoveredEmployee(new WC7CoveredEmployeeBuilder().withClassCode("2501").withPayroll(30000).withLocation(moPolicyLocation))
          )
          .create(bundle)
       period.PaymentPlanID = "ReportingPlanId"
       period.PaymentPlanName = displaykey.Web.Demo.Billing.DemoReportingPaymentPlan
    })
    return period
  }  
  
  static function wWC7Retro() : PolicyPeriod {
    var period : PolicyPeriod
    Transaction.runWithNewBundle(\ bundle -> {
      period = new WC7SubmissionBuilder()
          .withBillingMethod(BillingMethod.TC_DIRECTBILL)
          .withReportingPattern("ReportCalendarMonthExclLast")
          .withProducerCodeOfRecord(getProducerCode())
          .withReportingPlan()
          .withWC7CoveredEmployee(new WC7CoveredEmployeeBuilder().withClassCode("0005"))
          .withBaseState(new WC7SubmissionBuilderHelper().State)
          .isDraft()
          .create(bundle)
       period.PaymentPlanID = "ReportingPlanId"
       period.PaymentPlanName = displaykey.Web.Demo.Billing.DemoReportingPaymentPlan
    })
    
    var retroRatingPlan = period.WC7Line.createAndAddWC7RetrospectiveRatingPlanWM() 
    retroRatingPlan.LastComputationDate = retroRatingPlan.FirstComputationDate.addYears(1)
    retroRatingPlan.IncludeALAE = false
    retroRatingPlan.LossConversionFactor = 1
    retroRatingPlan.LossLimitAmount = 3437 
    retroRatingPlan.EstimatedStandardPremium = 343
    retroRatingPlan.MinRetroPremiumRatio = 1.5
    retroRatingPlan.MaxRetroPremiumRatio = 1.75
    
    var letterOfCredit = retroRatingPlan.createAndAddWC7LetterOfCreditWM()
    letterOfCredit.IssuerName = "Marshmellow Company"
    letterOfCredit.Amount = 500
    letterOfCredit.ValidFrom = retroRatingPlan.FirstComputationDate
    letterOfCredit.ValidTo = retroRatingPlan.LastComputationDate
    var jurisdictionMultiplier = retroRatingPlan.createAndAddWC7JurisdictionMultiplierWM()
    jurisdictionMultiplier.Jurisdiction = Jurisdiction.TC_CA
    jurisdictionMultiplier.JurisdictionTaxMultiplier = 500
    jurisdictionMultiplier.FederalTaxMultiplier = 900
    jurisdictionMultiplier.JurisdictionExcessLossFactor = 5
    jurisdictionMultiplier.FederalExcessLossFactor = 9
    period.Bundle.commit()
    return period
  }

  static function wBALine() : PolicyPeriod {
    var period : PolicyPeriod
    Transaction.runWithNewBundle(\ bundle -> {
      var vehicleBuilder = new BAVehicleBuilder().withVIN("1").withClassCode("0420").withVehicleType(TC_PP)
      var lineBuilder = new BusinessAutoLineBuilder()
        .withJurisdiction(new BAJurisdictionBuilder()
        .withState(TC_CA))
        .withCoverage(new CoverageBuilder(BAOwnedLiabilityCov)
          .withPatternCode("BAOwnedLiabilityCov"))
        .withFleet("NonFleet").withVehicle(vehicleBuilder)
      var account = new AccountBuilder()
        .withAccountLocation(new AccountLocationBuilder())
        .withAccountNumber(KeyGenerator.nextString())
        .create(bundle)
      period = createPolicyPeriod(bundle, account, "BusinessAuto", lineBuilder)
    })
    return period
  }
  
  static function wBOPLine() : PolicyPeriod {
    var period : PolicyPeriod
    Transaction.runWithNewBundle(\ bundle -> {
      var contactBuilder = new PersonBuilder()
        .withFirstName(KeyGenerator.getFirstName())
        .withLastName(KeyGenerator.getLastName())
      var account = new AccountBuilder(false)
        .withAccountHolderContact(contactBuilder)
        .withAccountNumber(KeyGenerator.getAccountNumber())
        .create(bundle)
      var lineBuilder = new BOPLineBuilder()
         .withSmallBusinessType(SmallBusinessType.TC_APARTMENT)
         .withOnlyBOPLocation(new BOPLocationBuilder()
         .withBuilding(new BOPBuildingBuilder().withBuilding(new gw.api.databuilder.bop.BuildingBuilder())))
      period = createPolicyPeriod(bundle, account, "BusinessOwners", lineBuilder)
    })
    return period
  }
  
  static function wCPLine() : PolicyPeriod {
    var period : PolicyPeriod
    Transaction.runWithNewBundle(\ bundle -> {
      var primaryLocation = new AccountLocationBuilder().withLocationNumber(0001).withCode("0001").withName("Location 0001")
      var otherLocation = new AccountLocationBuilder().withLocationNumber(0002).withCode("0002").withName("Location 0002")
      var policyLocationBldr = new PolicyLocationBuilder().withAccountLocation(otherLocation)
      var account = new AccountBuilder()
        .withAccountNumber(KeyGenerator.nextString())
        .withPrimaryLocation(primaryLocation)
        .withAccountLocation(otherLocation)
        .create(bundle)
      
      var buildingBldr : gw.api.databuilder.cp.BuildingBuilder
      var cpbuildingBldr : gw.api.databuilder.cp.CPBuildingBuilder
      var locationBldr : gw.api.databuilder.cp.CPLocationBuilder
      var lineBuilder : gw.api.databuilder.cp.CommercialPropertyLineBuilder
      
      lineBuilder = new CommercialPropertyLineBuilder()
      for (i in 0..1) { // to increase the number of locations, you must add an AccountLocation and a PolicyLocation and hook them up
        var locationNum = i + 1
        locationBldr = new CPLocationBuilder()
        for (j in 0..1) { // OK to increase the number of buildings by adjusting the count
          var buildingNum = j + 1
          buildingBldr = new gw.api.databuilder.cp.BuildingBuilder().withDescription("Building ${locationNum}-${buildingNum}")
          cpbuildingBldr = new CPBuildingBuilder().withBuilding(buildingBldr)
          locationBldr.withBuilding(cpbuildingBldr)
          if (i==0) {
            ; // takes the default PolicyLocation that is created with the Submission
          } else {
            locationBldr.withLocation(policyLocationBldr)
          }
        }
        lineBuilder.withCPLocation(locationBldr)
      }
      period = new SubmissionBuilder()
        .withAccount(account)
        .withProduct("CommercialProperty")
        .withPolicyLine(lineBuilder)
        .withProducerCodeOfRecord(getProducerCode())
        .withPolicyLocation(policyLocationBldr)
        .isDraft()
        .create(bundle)
      period.PaymentPlanID = "pctest:2"
      period.PaymentPlanName = "Testing Payment Plan"

      // rberlin make coverages on the buildings distinct
      period.AllCoverables.whereTypeIs(CPBuilding).eachWithIndex(\ c, i -> {
        c.CoveragesFromCoverable.each(\ coverage -> {
          switch (typeof coverage) {
            // Rating engine only creates Costs for these two.
            case CPBldgCov: coverage.CPBldgCovLimitTerm.Value += 100000*i ; break
            case CPBPPCov:  coverage.CPBPPCovLimitTerm.Value  += 100000*i ; break

            default: break;
          }
        })
      })
    })
    return period
  }

  static function wGLLine() : PolicyPeriod {
    var period : PolicyPeriod
    Transaction.runWithNewBundle(\ bundle -> {
      var account = new AccountBuilder()
        .withAccountNumber(KeyGenerator.nextString())
        .create(bundle)
      var lineBuilder = new GeneralLiabilityLineBuilder()
        .withGLCoverageForm(GLCoverageFormType.TC_OCCURRENCE)
        .withExposure(new GLExposureBuilder().withClassCodeAndBasis("0012", 1000000))
      period = createPolicyPeriod(bundle, account, "GeneralLiability", lineBuilder)
    })
    return period
  }
  
  static function wIMLine() : PolicyPeriod{
    var period : PolicyPeriod
    Transaction.runWithNewBundle(\ bundle -> {
      var account = new AccountBuilder()
        .withAccountNumber(KeyGenerator.nextString())
        .create(bundle)
    var policyLocationBldr1 = new PolicyLocationBuilder()
    var imLocationBldr1 = new IMLocationBuilder().withLocation(policyLocationBldr1)
      var partBuilder = new IMSignPartBuilder()
        .withSign(new IMSignBuilder()
          .withIMLocation(imLocationBldr1)
          .withCoverage(new CoverageBuilder(entity.IMSignCov)
            .withPattern("IMSignCov")
            .withDirectTerm("IMSignLimit", 150000)))
      var lineBuilder = new InlandMarineLineBuilder()
        .withIMLocation(imLocationBldr1)
        .withPart(partBuilder)
        
      period = new SubmissionBuilder()
      .withPolicyLocation(policyLocationBldr1)
      .withAccount(account)
      .withProduct("InlandMarine")
      .withPolicyLine(lineBuilder)
      .withProducerCodeOfRecord(getProducerCode())
      .isDraft()
      .create(bundle)  
      period.PaymentPlanID = "pctest:2"
      period.PaymentPlanName = "Testing Payment Plan"
    })
    
    return period
  }

  static function wCPPLine(withCP : boolean, withGL : boolean, withIM : boolean) : PolicyPeriod {
    // Create CPP with three lines
    var period : PolicyPeriod
    Transaction.runWithNewBundle(\ bundle -> {
      period = new CPPSubmissionBuilder(true, withCP, withGL, withIM)
        .isDraft().create(bundle)
      // Explicitly remove unwanted lines so domain code is executed correctly (e.g., removing territory codes)
      period.CPLineExists = false
      period.GLLineExists = false
      period.IMLineExists = false
    })
    period.PaymentPlanID = "pctest:2"
    period.PaymentPlanName = "Testing Payment Plan"
    return period
  }

  static function createPolicyPeriod(bundle : Bundle, account : Account, 
                                     product : String, lineBuilder : PolicyLineBuilderBase) : PolicyPeriod {
    var period = new SubmissionBuilder()
      .withAccount(account)
      .withProduct(product)
      .withPolicyLine(lineBuilder)
      .withProducerCodeOfRecord(getProducerCode())
      .isDraft()
      .create(bundle)
    period.PaymentPlanID = "pctest:2"
    period.PaymentPlanName = "Testing Payment Plan"
    return period
  }
}
