import Contract from 'Contract'
import Process from './process'
import Ob from './ob'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Customer',
    'get_Company',
    'get_Fill_in_forms',
    'get_Pay_insurance_fee',
    'get_Pay_insurance_fee_or_Fill_in_forms_or_Renew_insurance',
    'get_Someone_buys_insurance',
    'get_Issue_the_receipt',
    'get_Issue_the_insurance_policy',
    'get_Issue_the_insurance_policy_or_Issue_the_receipt_or_Someone_buys_insurance',
    'get_Insurance_company_accepts_insurance',
    'get_The_insured_object_suffers_loss',
    'get_The_insured_claims_insurance',
    'get_The_insurance_company_investigates',
    'get_The_insurance_company_pays_compensation',
    'get_Renew_insurance'
  ]
  static authenticationFuncs = [
    'Fill_in_forms',
    'Pay_insurance_fee',
    'Pay_insurance_fee_or_Fill_in_forms_or_Renew_insurance',
    'Someone_buys_insurance',
    'Issue_the_receipt',
    'Issue_the_insurance_policy',
    'Issue_the_insurance_policy_or_Issue_the_receipt_or_Someone_buys_insurance',
    'Insurance_company_accepts_insurance',
    'The_insured_object_suffers_loss',
    'The_insured_claims_insurance',
    'The_insurance_company_investigates',
    'Refuse_to_compensate',
    'The_insurance_company_pays_compensation',
    'Renew_insurance'
  ]
  static publicFuncs = [
    'Customer',
    'get_Customer',
    'Company',
    'get_Company',
    'Fill_in_forms',
    'get_Fill_in_forms',
    'Pay_insurance_fee',
    'get_Pay_insurance_fee',
    'Pay_insurance_fee_or_Fill_in_forms_or_Renew_insurance',
    'get_Pay_insurance_fee_or_Fill_in_forms_or_Renew_insurance',
    'Someone_buys_insurance',
    'get_Someone_buys_insurance',
    'Issue_the_receipt',
    'get_Issue_the_receipt',
    'Issue_the_insurance_policy',
    'get_Issue_the_insurance_policy',
    'Issue_the_insurance_policy_or_Issue_the_receipt_or_Someone_buys_insurance',
    'get_Issue_the_insurance_policy_or_Issue_the_receipt_or_Someone_buys_insurance',
    'Insurance_company_accepts_insurance',
    'get_Insurance_company_accepts_insurance',
    'The_insured_object_suffers_loss',
    'get_The_insured_object_suffers_loss',
    'The_insured_claims_insurance',
    'get_The_insured_claims_insurance',
    'The_insurance_company_investigates',
    'get_The_insurance_company_investigates',
    'Refuse_to_compensate',
    'The_insurance_company_pays_compensation',
    'get_The_insurance_company_pays_compensation',
    'Renew_insurance',
    'get_Renew_insurance'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'INSURANCE'
    },
    accounts: [
      {
        type: {
          type: String,
          default: 0
        },
        address: {
          type: String,
          required: true
        }
      }
    ]
  }
  constructor(data) {
    super(data)
    this._process = new Process(data)
    this._ob = new Ob(data)
  }
  //---------------------Object------------------------------
  async Customer() {
    let Customer = await this._ob.createOb('CUSTOMER')
    return Customer
  }
  get_Customer() {
    let Customer = this._ob.getObByType('CUSTOMER')
    return Customer
  }
  async Company() {
    let Company = await this._ob.createOb('COMPANY')
    return Company
  }
  get_Company() {
    let Company = this._ob.getObByType('COMPANY')
    return Company
  }
  // --------------------Fill_in_forms---------------------------
  check_Fill_in_forms(address) {
    let check_Fill_in_forms = this.get_Fill_in_formsByAddress(address)
    if (!check_Fill_in_forms || check_Fill_in_forms.type !== 'FILL_IN_FORMS') throw `FILL_IN_FORMS IS NOT EXIST`
    return true
  }
  get_Fill_in_formsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Fill_in_forms() {
    await this._ob.checkOb(this.sender, 'CUSTOMER')
    let Fill_in_forms = await this._process.createProcess('FILL_IN_FORMS')
    return Fill_in_forms
  }
  get_Fill_in_forms() {
    return this._process.getProcessByType('FILL_IN_FORMS')
  }
  // --------------------Pay_insurance_fee--------------------------- 
  check_Pay_insurance_fee(address) {
    let check_Pay_insurance_fee = this.get_Pay_insurance_feeByAddress(address)
    if (!check_Pay_insurance_fee || check_Pay_insurance_fee.type !== 'PAY_INSURANCE_FEE') throw `PAY_INSURANCE_FEE IS NOT EXIST`
    return true
  }
  get_Pay_insurance_feeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Pay_insurance_fee() {
    await this._ob.checkOb(this.sender, 'CUSTOMER')
    let Pay_insurance_fee = await this._process.createProcess('PAY_INSURANCE_FEE')
    return Pay_insurance_fee
  }
  get_Pay_insurance_fee() {
    return this._process.getProcessByType('PAY_INSURANCE_FEE')
  }
  //--------------------Someone_buys_insurance---------------------------
  checkProcess1(address) {
    this.check_Pay_insurance_fee = this.get_Pay_insurance_feeByAddress(address);
    this.check_Fill_in_forms = this.get_Fill_in_formsByAddress(address);
    this.check_Renew_insurance = this.get_Renew_insuranceByAddress(address);
    if (this.check_Pay_insurance_fee.type == 'PAY_INSURANCE_FEE') {
      return true;
    }
    else if (this.check_Fill_in_forms.type == 'FILL_IN_FORMS') {
      return true;
    }
    else if (this.check_Renew_insurance.type == 'RENEW_INSURANCE') {
      return true;
    }
    else {
      throw `PAY_INSURANCE_FEE_OR_FILL_IN_FORMS_OR_RENEW_INSURANCE_FOR_CHECK IS NOT EXIST`;
    }
  }
  async Pay_insurance_fee_or_Fill_in_forms_or_Renew_insurance() {
    await this.checkProcess1(this.sender, 'PAY_INSURANCE_FEE_OR_FILL_IN_FORMS_OR_RENEW_INSURANCE_FOR_CHECK')
    let check = await this._process.createProcess('PAY_INSURANCE_FEE_OR_FILL_IN_FORMS_OR_RENEW_INSURANCE')
    return check
  }
  get_Pay_insurance_fee_or_Fill_in_forms_or_Renew_insurance() {
    return this._process.getProcessByType('PAY_INSURANCE_FEE_OR_FILL_IN_FORMS_OR_RENEW_INSURANCE')
  }
  check_Someone_buys_insurance(address) {
    let check_Someone_buys_insurance = this.get_Someone_buys_insuranceByAddress(address)
    if (!check_Someone_buys_insurance || check_Someone_buys_insurance.type !== 'SOMEONE_BUYS_INSURANCE') throw `SOMEONE_BUYS_INSURANCE IS NOT EXIST`
    return true
  }
  get_Someone_buys_insuranceByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Someone_buys_insurance(address_Pay_insurance_fee_or_Fill_in_forms_or_Renew_insurance) {
    this._ob.checkOb(this.sender, 'COMPANY')
    let check_Pay_insurance_fee_or_Fill_in_forms_or_Renew_insurance = this._process.getProcessByAddress(address_Pay_insurance_fee_or_Fill_in_forms_or_Renew_insurance)
    if (!check_Pay_insurance_fee_or_Fill_in_forms_or_Renew_insurance || check_Pay_insurance_fee_or_Fill_in_forms_or_Renew_insurance.type !== 'PAY_INSURANCE_FEE_OR_FILL_IN_FORMS_OR_RENEW_INSURANCE')
      throw 'PAY_INSURANCE_FEE_OR_FILL_IN_FORMS_OR_RENEW_INSURANCE IS NOT EXIST'
    let Someone_buys_insurance = await this._process.createProcess('SOMEONE_BUYS_INSURANCE')
    return Someone_buys_insurance
  }
  get_Someone_buys_insurance() {
    return this._process.getProcessByType('SOMEONE_BUYS_INSURANCE')
  }
  //--------------------Issue_the_receipt---------------------------
  check_Issue_the_receipt(address) {
    let check_Issue_the_receipt = this.get_Issue_the_receiptByAddress(address)
    if (!check_Issue_the_receipt || check_Issue_the_receipt.type !== 'ISSUE_THE_RECEIPT') throw `ISSUE_THE_RECEIPT IS NOT EXIST`
    return true
  }
  get_Issue_the_receiptByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Issue_the_receipt() {
    await this._ob.checkOb(this.sender, 'COMPANY')
    let Issue_the_receipt = await this._process.createProcess('ISSUE_THE_RECEIPT')
    return Issue_the_receipt
  }
  get_Issue_the_receipt() {
    return this._process.getProcessByType('ISSUE_THE_RECEIPT')
  }
  //--------------------Issue_the_insurance_policy---------------------------
  check_Issue_the_insurance_policy(address) {
    let check_Issue_the_insurance_policy = this.get_Issue_the_insurance_policyByAddress(address)
    if (!check_Issue_the_insurance_policy || check_Issue_the_insurance_policy.type !== 'ISSUE_THE_INSURANCE_POLICY') throw `ISSUE_THE_INSURANCE_POLICY IS NOT EXIST`
    return true
  }
  get_Issue_the_insurance_policyByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Issue_the_insurance_policy() {
    await this._ob.checkOb(this.sender, 'COMPANY')
    let Issue_the_acceipt = await this._process.createProcess('ISSUE_THE_INSURANCE_POLICY')
    return Issue_the_acceipt
  }
  get_Issue_the_insurance_policy() {
    return this._process.getProcessByType('ISSUE_THE_INSURANCE_POLICY')
  }
  // -----------------------Insurance_company_accepts_insurance------------------------
  checkProcess2(address) {
    this.check_Issue_the_insurance_policy = this.get_Issue_the_insurance_policyByAddress(address);
    this.check_Issue_the_receipt = this.get_Issue_the_receiptByAddress(address);
    this.check_Someone_buys_insurance = this.get_Someone_buys_insuranceByAddress(address)

    if (this.check_Issue_the_insurance_policy.type == 'ISSUE_THE_INSURANCE_POLICY') {
      return true;
    }
    else if (this.check_Issue_the_receipt.type == 'ISSUE_THE_RECEIPT') {
      return true;
    }
    else if (this.check_Someone_buys_insurance.type == 'SOMEONE_BUYS_INSURANCE') {
      return true;
    }
    else {
      throw `ISSUE_THE_INSURANCE_POLICY_OR_ISSUE_THE_RECEIPT_OR_SOMEONE_BUYS_INSURANCE_FOR_CHECK IS NOT EXIST`;
    }
  }
  async Issue_the_insurance_policy_or_Issue_the_receipt_or_Someone_buys_insurance() {
    this.checkProcess2(this.sender, 'ISSUE_THE_INSURANCE_POLICY_OR_ISSUE_THE_RECEIPT_OR_SOMEONE_BUYS_INSURANCE_FOR_CHECK')
    let Insurance_company_accepts_insurance = await this._process.createProcess('ISSUE_THE_INSURANCE_POLICY_OR_ISSUE_THE_RECEIPT_OR_SOMEONE_BUYS_INSURANCE')
    return Insurance_company_accepts_insurance
  }
  get_Issue_the_insurance_policy_or_Issue_the_receipt_or_Someone_buys_insurance() {
    return this._process.getprocessByType('INSURANCE_COMPANY_ACCEPTS_INSURANCE')
  }
  async Insurance_company_accepts_insurance(address_Issue_the_insurance_policy_or_Issue_the_receipt_or_Someone_buys_insurance) {
    this._ob.checkOb(this.sender, 'COMPANY')
    let check_Issue_the_insurance_policy_or_Issue_the_receipt_or_Someone_buys_insurance = this._process.getProcessByAddress(address_Issue_the_insurance_policy_or_Issue_the_receipt_or_Someone_buys_insurance)
    if (!check_Issue_the_insurance_policy_or_Issue_the_receipt_or_Someone_buys_insurance || check_Issue_the_insurance_policy_or_Issue_the_receipt_or_Someone_buys_insurance.type !== 'ISSUE_THE_INSURANCE_POLICY_OR_ISSUE_THE_RECEIPT_OR_SOMEONE_BUYS_INSURANCE')
      throw 'ISSUE_THE_INSURANCE_POLICY_OR_ISSUE_THE_RECEIPT_OR_SOMEONE_BUYS_INSURANCE IS NOT EXIST'
    let process = await this._process.createProcess('INSURANCE_COMPANY_ACCEPT_INSURANCE')
    return process
  }
  get_Insurance_company_accepts_insurance() {
    return this._process.getProcessByType('INSURANCE_COMPANY_ACCEPT_INSURANCE')
  }
  // --------------------The_insured_object_suffers_loss---------------------------
  async The_insured_object_suffers_loss(address_Insurance_company_accepts_insurance) {
    this._ob.checkOb(this.sender, 'COMPANY')
    let check_Insurance_company_accepts_insurance = this._process.getProcessByAddress(address_Insurance_company_accepts_insurance)
    if (!check_Insurance_company_accepts_insurance || check_Insurance_company_accepts_insurance.type !== 'INSURANCE_COMPANY_ACCEPT_INSURANCE')
      throw 'INSURANCE_COMPANY_ACCEPT_INSURANCE IS NOT EXIST'
    let The_insured_object_suffers_loss = await this._process.createProcess('THE_INSURED_OBJECT_SUFFERS_LOSS')
    return The_insured_object_suffers_loss
  }
  get_The_insured_object_suffers_loss() {
    return this._process.getProcessByType('THE_INSURED_OBJECT_SUFFERS_LOSS')
  }
  // --------------------The_insured_claims_insurance---------------------------
  async The_insured_claims_insurance(address_The_insured_object_suffers_loss) {
    this._ob.checkOb(this.sender, 'COMPANY')
    let check_The_insured_object_suffers_loss = this._process.getProcessByAddress(address_The_insured_object_suffers_loss)
    if (!check_The_insured_object_suffers_loss || check_The_insured_object_suffers_loss.type !== 'THE_INSURED_OBJECT_SUFFERS_LOSS')
      throw 'THE_INSURED_OBJECT_SUFFERS_LOSS IS NOT EXIST'
    let The_insured_claims_insurance = await this._process.createProcess('THE_INSURED_CLAIMS_INSURANCE')
    return The_insured_claims_insurance
  }
  get_The_insured_claims_insurance() {
    return this._process.getProcessByType('THE_INSURED_CLAIMS_INSURANCE')
  }
  // --------------------The_insurance_company_investigates---------------------------
  async The_insurance_company_investigates(address_The_insured_claims_insurance) {
    this._ob.checkOb(this.sender, 'COMPANY')
    let check_The_insured_claims_insurance = this._process.getProcessByAddress(address_The_insured_claims_insurance)
    if (!check_The_insured_claims_insurance || check_The_insured_claims_insurance.type !== 'THE_INSURED_CLAIMS_INSURANCE')
      throw 'THE_INSURED_CLAIMS_INSURANCE IS NOT EXIST'
    let The_insurance_company_investigates = await this._process.createProcess('THE_INSURANCE_COMPANY_INVESTIGATES')
    return The_insurance_company_investigates
  }
  get_The_insurance_company_investigates() {
    return this._process.getProcessByType('THE_INSURANCE_COMPANY_INVESTIGATES')
  }
  // --------------------Refuse_to_compensate---------------------------
  async Refuse_to_compensate(address_The_insured_claims_insurance) {
    this._ob.checkOb(this.sender, 'COMPANY')
    let check_The_insured_claims_insurance = this._process.getProcessByAddress(address_The_insured_claims_insurance)
    if (!check_The_insured_claims_insurance || check_The_insured_claims_insurance.type !== 'THE_INSURANCE_COMPANY_INVESTIGATES')
      throw 'THE_INSURANCE_COMPANY_INVESTIGATES IS NOT EXIST'
    let Refuse_to_compensate = await this._process.createProcess('REFUSE_TO_COMPENSATE')
    this.setToAddress(Refuse_to_compensate.address)
    return 'SUCCESS'
  }
  // --------------------The_insurance_company_pays_compensation---------------------------
  check_The_insurance_company_pays_compensation(address) {
    let check_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts = this.get_OThe_insurance_company_pays_compensationByAddress(address)
    if (!check_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts || check_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts.type !== 'OTA_SPLITS_ESTIMATED_QUARTERLY_AMOUNTS_INTO_MONTHLY_AMOUNTS') throw `OTA_SPLITS_ESTIMATED_QUARTERLY_AMOUNTS_INTO_MONTHLY_AMOUNTS IS NOT EXIST`
    return true
  }
  get_OTA_splits_estimated_quarterly_amounts_into_monthly_amountsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async The_insurance_company_pays_compensation(address_The_insured_claims_insurance) {
    this._ob.checkOb(this.sender, 'COMPANY')
    let check_The_insurance_company_investigates = this._process.getProcessByAddress(address_The_insured_claims_insurance)
    if (!check_The_insurance_company_investigates || check_The_insurance_company_investigates.type !== 'THE_INSURANCE_COMPANY_INVESTIGATES')
      throw 'THE_INSURANCE_COMPANY_INVESTIGATES IS NOT EXIST'
    let The_insurance_company_pays_compensation = await this._process.createProcess('THE_INSURANCE_COMPANY_PAYS_COMPENSATION')
    return The_insurance_company_pays_compensation
  }
  get_The_insurance_company_pays_compensation() {
    return this._process.getProcessByType('THE_INSURANCE_COMPANY_PAYS_COMPENSATION')
  }
  // --------------------Renew_insurance---------------------------
  check_Renew_insurance(address) {
    let check_Renew_insurance = this.get_Renew_insuranceByAddress(address)
    if (!check_Renew_insurance || check_Renew_insurance.type !== 'RENEW_INSURANCE') throw `RENEW_INSURANCE IS NOT EXIST`
    return true
  }
  get_Renew_insuranceByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Renew_insurance(address_The_insurance_company_pays_compensation) {
    this._ob.checkOb(this.sender, 'COMPANY')
    let check_The_insurance_company_pays_compensation = this._process.getProcessByAddress(address_The_insurance_company_pays_compensation)
    if (!check_The_insurance_company_pays_compensation || check_The_insurance_company_pays_compensation.type !== 'THE_INSURANCE_COMPANY_PAYS_COMPENSATION')
      throw 'THE_INSURANCE_COMPANY_PAYS_COMPENSATION IS NOT EXIST'
    let Renew_insurance = await this._process.createProcess('RENEW_INSURANCE')
    return Renew_insurance
  }
  get_Renew_insurance() {
    return this._process.getProcessByType('RENEW_INSURANCE')
  }
}
export default TokenMain;
