package gw.plugin.billing.impl
uses gw.plugin.billing.IBillingSummaryPlugin
uses java.util.Date
uses java.util.ArrayList
uses gw.plugin.billing.BillingPeriodInfo
uses gw.plugin.billing.BillingAccountInfo
uses gw.plugin.billing.BillingInvoiceInfo
uses java.math.BigDecimal
uses gw.plugin.billing.BillingPeriodInfoJava
uses gw.api.database.Query
uses gw.api.database.Relop


@Export
class StandAloneBillingSummaryPlugin implements IBillingSummaryPlugin
{
  construct()
  {
  }

  public static var INSTANCE : IBillingSummaryPlugin = new StandAloneBillingSummaryPlugin()

  override function retrieveAccountBillingSummary( accountNumber : String ) : BillingAccountInfo {
    var mockSoapAccount = new MockAccountBilling(){
      :BilledOutstandingTotal = new BigDecimal("12077.18"),
      :BilledOutstandingCurrent = new BigDecimal("11077.18"),
      :BilledOutstandingPastDue = new BigDecimal("1000.18"),
      :UnbilledTotal = new BigDecimal("35999.38"),
      :UnappliedFundsTotal = new BigDecimal("0.00"),
      :CollateralRequirement = new BigDecimal("5000.00"),
      :CollateralHeld = new BigDecimal("5000.00"),
      :CollateralChargesBilled = new BigDecimal("0.00"),
      :CollateralChargesPastDue = new BigDecimal("0.00"),
      :CollateralChargesUnbilled = new BigDecimal("0.00"),
      :Delinquent = false,
      :MockBillingSettings = new MockBillingSettings(){
        :InvoiceDeliveryMethod = InvoiceDeliveryMethod.TC_MAIL,
        :PaymentMethod = AccountPaymentMethod.TC_CREDITCARD.Code,
        :CreditCardIssuer = CreditCardIssuer.TC_DISCOVER.Code, 
        :CreditCardNumber = "************3044", 
        :CreditCardExpMonth = 5,
        :CreditCardExpYear = 2012
      },
      :MockPrimaryPayer = new MockBillingContact(){
        :Name = "Bill Kinman",
        :Address = "4040 Elmwood Ave, Floor 0000, Louisville, KY 40207, US",
        :Phone = "850-578-1682 x0007"
      }
    }
    return mockSoapAccount
  }


  override function retrievePolicyBillingSummary( policyNumber : String, termNumber : int ) : BillingPeriodInfo
  {
    var invoice1 = new MockInvoice(){
      :Amount = 10000,
      :Billed = 2000,
      :InvoiceDate = Date.CurrentDate.addDays( -10 ),
      :InvoiceDueDate = Date.CurrentDate.addDays( 20 ),
      :Paid = 1000,
      :PastDue = 0,
      :InvoiceStream = "Monthly / Send Invoice"
    }
    var invoice2 = new MockInvoice(){
      :Amount = 3000,
      :Billed = 0,
      :InvoiceDate = Date.CurrentDate.addDays( 20 ),
      :InvoiceDueDate = Date.CurrentDate.addDays( 50 ),
      :Paid = 0,
      :PastDue = 0,
      :InvoiceStream = "Monthly / Send Invoice"
    }
    var mockObject = new MockPolicyPeriodBilling(){
      :Periods = {"04/03/09 - 04/03/10"},
      :BillingMethod = BillingMethod.TC_AGENCYBILL,
      :CurrentOutstanding = 6000,
      :DepositRequirement = 5000,
      :MockInvoices = new MockInvoice[]{invoice1, invoice2},
      :Paid = 15000,
      :PastDue = 1000,
      :PaymentPlanName = "5 Pay",
      :TotalBilled = 22000,
      :Unbilled = 12000,
      :TotalCharges = 34000,
      :Delinquent = false,
      :InvoiceStream = "Monthly / Manual Payment",
      :AltBillingAccount = "Uncle Sam"}
    return mockObject
  }


  override function retrieveBillingPolicies( accountNumber: String ) : BillingPeriodInfo[]
  {
    var bcPeriods = new ArrayList<BillingPeriodInfo>()
    var periods = Account.finder.findAccountByAccountNumber(accountNumber).Policies*.BoundPeriods
    for(period in periods index i){
      var soapObject = new MockPolicyPeriodBilling(){          
        :BillingMethod = BillingMethod.TC_DIRECTBILL,
        :Delinquent = i % 2 == 0,
        :EffectiveDate = period.PeriodStart,
        :ExpirationDate = period.PeriodEnd,
        :PastDue = 2000,
        :PolicyNumber = period.PolicyNumber,
        :TermNumber = period.TermNumber,
        :Product = period.Policy.Product.Description,
        :TotalBilled = 4000,
        :Unbilled = 1000,
        :AltBillingAccount = period.AltBillingAccountNumber,
        :InvoiceStream = {"Monthly / Visa xxxx-4857", "Weekly / Amex xxxx-4624"}[i%2]
      }
      bcPeriods.add(soapObject)
    }
    return bcPeriods.toTypedArray()
  }

  override function retrieveAccountInvoices( p0: String ) : BillingInvoiceInfo[]
  {
    var invoice1 = new MockInvoice(){
      :InvoiceNumber = "GH3455860",
      :Status = "Closed",
      :PaidStatus = "Fully Paid",
      :Amount = 100.73,
      :InvoiceDate = new Date().addMonths( -4 ),
      :InvoiceDueDate = new Date().addMonths( -3 ),
      :Unpaid = 0,
      :InvoiceStream = "PA, Manual Payment"
    }
    var invoice2 = new MockInvoice(){
      :InvoiceNumber = "YU12349567",
      :Status = "Open",
      :PaidStatus = "Partially Paid",
      :Amount = 400.67,
      :InvoiceDate = new Date().addMonths( 1 ),
      :InvoiceDueDate = new Date().addMonths( 2 ),
      :Unpaid = 123.56,
      :InvoiceStream = "PA, Manual Payment"
    }
    var invoice3 = new MockInvoice(){
      :InvoiceNumber = "JH34798456",
      :Status = "Planned",
      :PaidStatus = "Current",
      :Amount = 400.67,
      :InvoiceDate = new Date().addMonths( 3 ),
      :InvoiceDueDate = new Date().addMonths( 4 ),
      :Unpaid = 400.67,
      :InvoiceStream = "PA, Manual Payment"
    }
    return new BillingInvoiceInfo[]{invoice1, invoice2, invoice3}
  }

  override function getPoliciesBilledToAccount(accountNumber : String) : BillingPeriodInfoJava[] {
    var bcPeriods = new ArrayList<BillingPeriodInfo>()
    var query = new Query<PolicyPeriod>(PolicyPeriod)
    query.compare("Status", Relop.Equals, PolicyPeriodStatus.TC_BOUND)
    var policyNumber = query.select(\ p -> p.PolicyNumber).FirstResult
    var soapObject = new MockPolicyPeriodBilling(){          
      :BillingMethod = BillingMethod.TC_DIRECTBILL,
      :Delinquent = true,
      :EffectiveDate = Date.Today,
      :ExpirationDate = Date.Today.addYears(1),
      :PastDue = 2000,
      :PolicyNumber = policyNumber,
      :TermNumber = 1,
      :Product = "Business Auto",
      :TotalBilled = 4000,
      :Unbilled = 1000,
      :OwningAccount = accountNumber + " Sub",
      :InvoiceStream = "PA, Manual Payment"
    }
    bcPeriods.add(soapObject)
    return bcPeriods.toTypedArray()
  }

}
