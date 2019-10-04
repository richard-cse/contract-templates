import Contract from 'Contract'
import Clinic from './process'
import Level from './level'
import User from './user'
import process from './process'
import Process from './process';

class TokenMain extends Contract {
  static viewFuncs = [
    'getRish_AssessmentByAddress',
    'getRish_Assessment',
    'getLow',
    'getMedium',
    'getHigh',
  ]
  static authenticationFuncs = ['Set_Level','Rish_Assessment']
  static publicFuncs = [
    'createClinic',
    'getRish_AssessmentByAddress',
    'getRish_Assessment',
    'Set_Level',
    'getLow',
    'getMedium',
    'getHigh',
    'update_verify_Existing_or_obtain_additional_KYC_information_for_transaction',
    'Transaction_monitoring_using_rish_based_approach',
    'Update_verify_existing_or_obtain_additional_KYC_information',
    'Does_the_transaction_activity_show_complex_unusually_large_transactions_or_unsual_patterns_of_transactions_with_no_economic_or_lawful_purpose',
    'Enhanced_due_diligence',
    'Is_there_suspicious_activity',
    'Sumit_a_suspicious_matter_report_and_continue_'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'AML KYC'
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
    this._clinic = new Clinic(data)
    this._user = new User(data)
    this._level=new Level(data)
    this._process=new Process(data)
  }
  async Rish_Assessment() {
    let rish = await this._user.createUser()
    return rish
  }
  getRish_AssessmentByAddress(address) {
    return this._user.getUserByAddress(address)
  }
  getRish_Assessment() {
    return this._user.getUser()
  }
  async Set_Level(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2, 3].includes(Number(type))) throw 'CREATE LEVEL FAIL'
    await this._Process.checkProcess(this.sender)
    let level= await this._level.createLevel(type - 1, this.sender)
    this.setToAddress(level.address)
    return level
  }
  async getLow() {
    await this._process.checkProcess(this.sender)
    return this._level.getLevelByType('LOW', this.sender)
  }
  async getMedium() {
    await this._process.checkProcess(this.sender)
    return this._level.getLevelByType('MEDIUM', this.sender)
  }
  async getHigh() {
    await this._process.checkProcess(this.sender)
    return this._level.getLevelByType('HIGH', this.sender)
  }
  check_update_verify_Existing_or_obtain_additional_KYC_information_for_transaction(address) {
    let check_update_verify_Existing_or_obtain_additional_KYC_information_for_transaction = this.get_update_verify_Existing_or_obtain_additional_KYC_information_for_transaction(address)
    if (!check_update_verify_Existing_or_obtain_additional_KYC_information_for_transaction || check_update_verify_Existing_or_obtain_additional_KYC_information_for_transaction.type !== 'UPDATE_VERIFY_RXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON_FOR_TRANSACTION') throw `UPDATE_VERIFY_RXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON_FOR_TRANSACTION IS NOT EXIST`
    return true
  }
  get_update_verify_Existing_or_obtain_additional_KYC_information_for_transaction(address) {
    return this.accounts.find(account => account.address === address)
  }
  async update_verify_Existing_or_obtain_additional_KYC_information_for_transaction(address_Set_Level) {
    let low = this._level.getLevelByAddress(this.sender)
    if (!low|| low.type !== 'LOW') throw 'LOW IS NOT EXIST'
    let medium = this._level.getLevelByAddress(address_Set_Level)
    if (!medium || medium.type !== 'MEDIUM') throw 'MEDIUM IS NOT EXIST'
    let high = this._level.getLevelByAddress(address_Set_Level)
    if (!high| high.type !== 'HIGH') throw 'HIGH IS NOT EXIST'
    let update = await this._process.createProcess('UPDATE_VERIFY_RXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON_FOR_TRANSACTION')
    return update
  }
  get_update_verify_Existing_or_obtain_additional_KYC_information_for_transaction() {
    return this._process.getProcessByType('UPDATE_VERIFY_RXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON_FOR_TRANSACTION')
  }
  checkQS1(address) {
    this.check_update_verify_Existing_or_obtain_additional_KYC_information_or_transaction = this.get_update_verify_Existing_or_obtain_additional_KYC_information_or_transaction(address);
    this.check_update_verify_Existing_or_obtain_additional_KYC_information = this.get_update_verify_Existing_or_obtain_additional_KYC_information(address);

    if (this.check_update_verify_Existing_or_obtain_additional_KYC_information.type == 'UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON_FOR_TRANSACTION') {
      return true;
    }
    else if (this.check_update_verify_Existing_or_obtain_additional_KYC_information.type == 'UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON') {
      return true;
    }
    else {
      throw `UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON_OR_UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON_OR_TRANSACTION IS NOT EXIST`;

    }

  }
  async Transaction_monitoring_using_rish_based_approach() {
    await this.checkQS1(this.sender, 'UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON_OR_UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON_OR_TRANSACTION')
    let transaction = await this._process.createProcess('TRANSACTION_MONITORING_USING_RISH_BASED_APPROACH')
    return transaction
  }
  get_Transaction_monitoring_using_rish_based_approach() {
    return this._process.getProcessByType('TRANSACTION_MONITORING_USING_RISH_BASED_APPROACH')
  }
  async Does_the_transaction_activity_show_complex_unusually_large_transactions_or_unsual_patterns_of_transactions_with_no_economic_or_lawful_purpose(address_Transaction_monitoring_using_rish_based_approach) {
    let check_Transaction = this._process.getProcessByAddress(address_Transaction_monitoring_using_rish_based_approach)
    if (!check_Transaction || check_Transaction.type !== 'TRANSACTION_MONITORING_USING_RISH_BASED_APPROACH')
      throw 'TRANSACTION_MONITORING_USING_RISH_BASED_APPROACH IS NOT EXIST'
    let transaction = await this._process.createProcess('DOES_THE_TRANSACTION_ACTIVITY_SHOW_COMPLEX_UNUSUALLY_LARGE_TRANSACTIONS')
    return transaction
  }
  get_Does_the_transaction_activity_show_complex_unusually_large_transactions_or_unsual_patterns_of_transactions_with_no_economic_or_lawful_purpose() {
    return this._process.getProcessByType('DOES_THE_TRANSACTION_ACTIVITY_SHOW_COMPLEX_UNUSUALLY_LARGE_TRANSACTIONS')
  }
  check_update_verify_Existing_or_obtain_additional_KYC_information(address) {
    let check_update_verify_Existing_or_obtain_additional_KYC_information = this.get_update_verify_Existing_or_obtain_additional_KYC_information(address)
    if (!check_update_verify_Existing_or_obtain_additional_KYC_information || check_update_verify_Existing_or_obtain_additional_KYC_information.type !== 'UPDATE_VERIFY_RXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON') throw `UPDATE_VERIFY_RXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON IS NOT EXIST`
    return true
  }
  get_update_verify_Existing_or_obtain_additional_KYC_information(address) {
    return this.accounts.find(account => account.address === address)
  }
  async update_verify_Existing_or_obtain_additional_KYC_information(address_Set_Level) {
    let low = this._level.getLevelByAddress(this.sender)
    if (!low|| low.type !== 'LOW') throw 'LOW IS NOT EXIST'
    let medium = this._level.getLevelByAddress(address_Set_Level)
    if (!medium || medium.type !== 'MEDIUM') throw 'MEDIUM IS NOT EXIST'
    let high = this._level.getLevelByAddress(address_Set_Level)
    if (!high| high.type !== 'HIGH') throw 'HIGH IS NOT EXIST'
    let update = await this._process.createProcess('UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON')
    return update
  }

  get_update_verify_Existing_or_obtain_additional_KYC_information() {
    return this._process.getProcessByType('UPDATE_VERIFY_RXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON')
  }
 
  async Enhanced_due_diligence(address_update_verify_Existing_or_obtain_additional_KYC_information) {
    let check_Enhanced_due_diligence = this._process.getProcessByAddress(address_update_verify_Existing_or_obtain_additional_KYC_information)
    if (!check_Enhanced_due_diligence || check_Enhanced_due_diligence.type !== 'UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON')
      throw 'UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON IS NOT EXIST'
    let transaction = await this._process.createProcess('ENHANCED_DUE_DILIGENCE')
    return transaction
  }
  get_Enhanced_due_diligence() {
    return this._process.getProcessByType('ENHANCED_DUE_DILIGENCE')
  }
  check_Is_there_suspicious_activity(address) {
    let check_Is_there_suspicious_activity = this.get_Is_there_suspicious_activityByAddress(address)
    if (!check_Is_there_suspicious_activity || check_Is_there_suspicious_activity.type !== 'IS_THERE_SUSPICIOUS_ACTIVITY') throw `IS_THERE_SUSPICIOUS_ACTIVITY IS NOT EXIST`
    return true
  }
  get_Is_there_suspicious_activityByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Is_there_suspicious_activity(address_Enhanced_due_diligence) {
    let check_Enhanced_due_diligence= this._process.getProcessByAddress(address_Enhanced_due_diligence)
    if (!check_Enhanced_due_diligence|| check_Enhanced_due_diligence.type !== 'EMHANCED_DUE_DILIGENCE')
      throw 'EMHANCED_DUE_DILIGENCE IS NOT EXIST'
    let suspiciou = await this._process.createProcess('IS_THERE_SUSPICIOUS_ACTIVITY')
    return suspiciou
  }
  get_Is_there_suspicious_activity() {
    return this._process.getProcessByType('IS_THERE_SUSPICIOUS_ACTIVITY')
  }
  checkQS(address) {
    this.check_update_verify_Existing_or_obtain_additional_KYC_information = this.get_Enhanced_due_diligenceByAddress(address);
    this.check_Is_there_suspicious_activity = this.get_Is_there_suspicious_activityByAddress(address);

    if (this.check_update_verify_Existing_or_obtain_additional_KYC_information.type == 'UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON') {
      return true;
    }
    else if (this.check_Is_there_suspicious_activity.type == 'IS_THERE_SUSPICIOUS_ACTIVITY') {
      return true;
    }
    else {
      throw `UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON_OR_IS_THERE_SUSPICIOUS_ACTIVITY IS NOT EXIST`;

    }

  }
  async Sumit_a_suspicious_matter_report_and_continue_() {
    await this.checkQS(this.sender, 'UPDATE_VERIFY_EXSTING_OR_OBTAIN_ADDITIONAL_KYC_INFORMATON_OR_IS_THERE_SUSPICIOUS_ACTIVITY')
    let suspiciou = await this._process.createProcess('SUMIT_A_SUSPICIOUS_MATTER_REPORT_AND_CONTINUE')
    return suspiciou
  }
  get_Sumit_a_suspicious_matter_report_and_continue_() {
    return this._process.getProcessByType('SUMIT_A_SUSPICIOUS_MATTER_REPORT_AND_CONTINUE')
  }
  


}
export default TokenMain
