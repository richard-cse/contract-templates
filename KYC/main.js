import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Data_Management_Center',
    'get_Associates_tally_time_of_missed_call_with_time_of_digital_signature',
    'get_Tele_callers_make_verification_call_to_verifY_KYC_information_and_tally_with_KYC_documents',
    'get_Verify_on_site_imagery',
    'get_Team_Leader_does_quality_checks_and_send_images_and_reports_to_operations_manager',
    

  ]
  static authenticationFuncs = [
    'Associates_tally_time_of_missed_call_with_time_of_digital_signature',
    'Tele_callers_make_verification_call_to_verifY_KYC_information_and_tally_with_KYC_documents',
    'Verify_on_site_imagery',
    'Team_Leader_does_quality_checks_and_send_images_and_reports_to_operations_manager',
    'Operations_Manger_runs_random_quality_checks',
  ]
  static publicFuncs = [
    'Data_Management_Center',
    'get_Data_Management_Center',
    'Associates_tally_time_of_missed_call_with_time_of_digital_signature',
    'get_Associates_tally_time_of_missed_call_with_time_of_digital_signature',
    'Tele_callers_make_verification_call_to_verifY_KYC_information_and_tally_with_KYC_documents',
    'get_Tele_callers_make_verification_call_to_verifY_KYC_information_and_tally_with_KYC_documents',
    'Verify_on_site_imagery',
    'get_Verify_on_site_imagery',
    'Team_Leader_does_quality_checks_and_send_images_and_reports_to_operations_manager',
    'get_Team_Leader_does_quality_checks_and_send_images_and_reports_to_operations_manager',
    'Operations_Manger_runs_random_quality_checks',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'MERCHANT_KYC'
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
    this._user = new User(data)
  }
    //---------------------USER------------------------------
  async Data_Management_Center() {
    let Data_Management_Centre = await this._user.createUser('DATA_MANAGEMENT_CENTER')
    return Data_Management_Centre

  }
  get_Data_Management_Center() {
    let Data_Management_Centre = this._user.getUserByType('DATA_MANAGEMENT_CENTER')
    return Data_Management_Centre
  }
    //---------------------Associates_tally_time_of_missed_call_with_time_of_digital_signature------------------------------

    check_Associates(address) {
      let check_Associates = this.get_AssociatesyAddress(address)
      if (!check_Associates || check_Associates.type !== 'ASSOCIATES_TALLY_TIME_OF_MISSED_CALL_WITH_TIME_OF_DIGITAL_SIGNATURE') throw `ASSOCIATES_TALLY_TIME_OF_MISSED_CALL_WITH_TIME_OF_DIGITAL_SIGNATURE IS NOT EXIST`
      return true
    }
    get_AssociatesyAddress(address) {
      return this.accounts.find(account => account.address === address)
    }
  async Associates_tally_time_of_missed_call_with_time_of_digital_signature() {
    await this._user.checkUser(this.sender, 'DATA_MANAGEMENT_CENTER')
    let associates = await this._process.createProcess('ASSOCIATES_TALLY_TIME_OF_MISSED_CALL_WITH_TIME_OF_DIGITAL_SIGNATURE')
    return associates
  }

  get_Associates_tally_time_of_missed_call_with_time_of_digital_signature() {
    return this._process.getProcessByType('ASSOCIATES_TALLY_TIME_OF_MISSED_CALL_WITH_TIME_OF_DIGITAL_SIGNATURE')
  }
    //---------------------Tele_callers_make_verification_call_to_verifY_KYC_information_and_tally_with_KYC_documents------------------------------
  checkTele(address) {
    let checkTele = this.getTeleByAddress(address)
    if (!checkTele || checkTele.type !== 'TELE_CALLERS_MAKE_VERIFICATION_CALL_TO_VERIFY_KYC_INFORMATION_AND_TALLY_WITH_KYC_DOCUMENTS') throw `TELE_CALLERS_MAKE_VERIFICATION_CALL_TO_VERIFY_KYC_INFORMATION_AND_TALLY_WITH_KYC_DOCUMENTS IS NOT EXIST`
    return true
  }
  getTeleByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Tele_callers_make_verification_call_to_verifY_KYC_information_and_tally_with_KYC_documents() {
    await this.check_Associates(this.sender, 'ASSOCIATES_TALLY_TIME_OF_MISSED_CALL_WITH_TIME_OF_DIGITAL_SIGNATURE')
    let tele = await this._process.createProcess('TELE_CALLERS_MAKE_VERIFICATION_CALL_TO_VERIFY_KYC_INFORMATION_AND_TALLY_WITH_KYC_DOCUMENTS')
    return tele
  }

  get_Tele_callers_make_verification_call_to_verifY_KYC_information_and_tally_with_KYC_documents() {
    return this._process.getProcessByType('TELE_CALLERS_MAKE_VERIFICATION_CALL_TO_VERIFY_KYC_INFORMATION_AND_TALLY_WITH_KYC_DOCUMENTS')
  }
    //---------------------Verify_on_site_imagery------------------------------
  checkVerify_on_site_imagery(address) {
    let checkVerify_on_site_imagery = this.getVerify_on_site_imageryByAddress(address)
    if (!checkVerify_on_site_imagery | checkVerify_on_site_imagery.type !== 'VERIFY_ON_SITE_IMAGERY') throw `VERIFY_ON_SITE_IMAGERY IS NOT EXIST`
    return true
  }
  getVerify_on_site_imageryByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Verify_on_site_imagery() {
    await this.checkTele(this.sender, 'TELE_CALLERS_MAKE_VERIFICATION_CALL_TO_VERIFY_KYC_INFORMATION_AND_TALLY_WITH_KYC_DOCUMENTS')
    let verify = await this._process.createProcess('VERIFY_ON_SITE_IMAGERY')
    return verify
  }

  get_Verify_on_site_imagery() {
    return this._process.getProcessByType('VERIFY_ON_SITE_IMAGERY')
  }
    //---------------------Team_Leader_does_quality_checks_and_send_images_and_reports_to_operations_manager------------------------------
  checkTeam_Leader(address) {
    let checkTeam_Leader = this.getTeam_LeaderByAddress(address)
    if (!checkTeam_Leader | checkTeam_Leader.type !== 'TEAM_LEADER_DOES_QUALITY_CHECKS_AND_SEND_IMAGES_AND_REPORTS_TO_OPERATIONS_MANAGER') throw `TEAM_LEADER_DOES_QUALITY_CHECKS_AND_SEND_IMAGES_AND_REPORTS_TO_OPERATIONS_MANAGER IS NOT EXIST`
    return true
  }
  getTeam_LeaderByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Team_Leader_does_quality_checks_and_send_images_and_reports_to_operations_manager() {
    await this.checkVerify_on_site_imagery(this.sender, 'VERIFY_ON_SITE_IMAGERY')
    let leader = await this._process.createProcess('TEAM_LEADER_DOES_QUALITY_CHECKS_AND_SEND_IMAGES_AND_REPORTS_TO_OPERATIONS_MANAGER')
    return leader
  }

  get_Team_Leader_does_quality_checks_and_send_images_and_reports_to_operations_manager() {
    return this._process.getProcessByType('VERIFY_ON_SITE_IMAGERY')
  }
    //---------------------Operations_Manger_runs_random_quality_checks------------------------------
  async Operations_Manger_runs_random_quality_checks() {
    await this.checkTeam_Leader(this.sender, 'TEAM_LEADER_DOES_QUALITY_CHECKS_AND_SEND_IMAGES_AND_REPORTS_TO_OPERATIONS_MANAGER')
    let Operations = await this._process.createProcess('OPERATIONS_MANGER_RUNS_RANDOM_QUALITY_CHECKS')
    this.setToAddress(Operations.address)
    return 'SUCCESS'
  }
}
export default TokenMain
