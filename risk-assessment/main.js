import Contract from 'Contract'
import Act from './act'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Document_Review',
    'get_Conceptual_Threats',
    'get_Liability_Issues',
    'get_Light',
    'get_Interview',
    'get_Assets',
    'get_Threats',
    'get_Crimes_and_Security_Incident',
    'get_Security_Personnel',
    'get_Policies_and_Training',
    'get_Operational',
    'get_Electronic_Systems',
    'get_Design_and_Barriers',
    'get_Physical',
    'get_Vulnerabilities',
    'get_Risk_Assessment',
  ]
  static authenticationFuncs = [
    'Interview',
    'Assets',
    'Threats',
    'Crimes_and_Security_Incident',
    'Vulnerabilities',
    'Security_Personnel',
    'Policies_and_Training',
    'Operational',
    'Electronic_Systems',
    'Design_and_Barriers',
    'Physical',
    'Risk_Assessment',
    'Risk_Mitigation_Recommenda',
    'Rish_Mitigation_Recommendations_Trade_Offs_and_Options'
  ]
  static publicFuncs = [
    'Document_Review',
    'get_Document_Review',
    'Conceptual_Threats',
    'get_Conceptual_Threats',
    'Liability_Issues',
    'get_Liability_Issues',
    'Light',
    'get_Light',
    'Interview',
    'get_Interview',
    'Assets',
    'get_Assets',
    'Threats',
    'get_Threats',
    'Crimes_and_Security_Incident',
    'get_Crimes_and_Security_Incident',
    'Security_Personnel',
    'get_Security_Personnel',
    'Policies_and_Training',
    'get_Policies_and_Training',
    'Operational',
    'get_Operational',
    'Electronic_Systems',
    'get_Electronic_Systems',
    'Design_and_Barriers',
    'get_Design_and_Barriers',
    'Physical',
    'get_Physical',
    'Vulnerabilities',
    'get_Vulnerabilities',
    'Risk_Assessment',
    'get_Risk_Assessment',
    'Rish_Mitigation_Recommendations_Trade_Offs_and_Options'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'SECURIITY-RISK-ASSESSMENT'
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
    this._act = new Act(data)
    this._process = new Process(data)
  }
  //---------------------Document_Review------------------------------
  async Document_Review() {
    let Document = await this._act.createAct('DOCUMET_REVIEW')
    return Document
  }
  get_Document_Review() {
    let Document = this._act.getActByType('DOCUMET_REVIEW')
    return Document
  }
  async Conceptual_Threats() {
    let Conceptual_Threats = await this._act.createAct('CONCEPTUAL_THREATS')
    return Conceptual_Threats
  }
  get_Conceptual_Threats() {
    let Conceptual_Threats = this._act.getActByType('CONCEPTUAL_THREATS')
    return Conceptual_Threats
  }
  async Liability_Issues() {
    let Liability_Issues = await this._act.createAct('LIABILITY_ISSUES')
    return Liability_Issues
  }
  get_Liability_Issues() {
    let Liability_Issues = this._act.getActByType('LIABILITY_ISSUES')
    return Liability_Issues
  }
  async Light() {
    let Light = await this._act.createAct('LIGHT')
    return Light
  }
  get_Light() {
    let Light = this._act.getActByType('LIGHT')
    return Light
  }
  //----------Interview---------------------------
  check_Interview(address) {
    let check_Interview = this.get_InterviewByAddress(address)
    if (!check_Interview || check_Interview.type !== 'INTERVIEW') throw `INTERVIEW IS NOT EXIST`
    return true
  }
  get_InterviewByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Interview() {
    await this._act.checkAct(this.sender, 'DOCUMET_REVIEW')
    let Interview = await this._process.createProcess('INTERVIEW')
    return Interview
  }
  get_Interview() {
    return this._process.getProcessByType('INTERVIEW')
  }
  //----------Assets---------------------------
  checkAssets(address) {
    let checkAssets = this.get_AssetsByAddress(address)
    if (!checkAssets || checkAssets.type !== 'ASSETS') throw `ASSETS IS NOT EXIST`
    return true
  }
  get_AssetsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Assets() {
    await this.check_Interview(this.sender, 'INTERVIEW')
    let Assets = await this._process.createProcess('ASSETS')
    return Assets
  }
  get_Assets() {
    return this._process.getProcessByType('ASSETS')
  }
  // --------------------Crimes_and_Security_Incident---------------------------
  check_Crimes_and_Security_Incident(address) {
    let check_Crimes_and_Security_Incident = this.get_Crimes_and_Security_IncidentByAddress(address)
    if (!check_Crimes_and_Security_Incident || check_Crimes_and_Security_Incident.type !== 'CRIMES_AND_SECURITY_INCIDENT') throw `CRIMES_AND_SECURITY_INCIDENT IS NOT EXIST`
    return true
  }
  get_Crimes_and_Security_IncidentByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Crimes_and_Security_Incident() {
    await this._act.checkAct(this.sender, 'CONCEPTUAL_THREATS')
    let Crimes_and_Security = await this._process.createProcess('CRIMES_AND_SECURITY_INCIDENT')
    return Crimes_and_Security
  }
  get_Crimes_and_Security_Incident() {
    return this._process.getProcessByType('CRIMES_AND_SECURITY_INCIDENT')
  }
  // --------------------Threats---------------------------
  checkACT1(address) {
    this.check_Crimes_and_Security_Incident = this.get_Crimes_and_Security_IncidentByAddress(address);
    this.checkAssets = this.get_AssetsByAddress(address);
    if (this.check_Crimes_and_Security_Incident.type == 'CRIMES_AND_SECURITY_INCIDENT') {
      return true;
    }
    else if (this.checkAssets.type == 'ASSETS') {
      return true;
    }
    else {
      throw `CRIMES_AND_SECURITY_INCIDENT_OR_ASSETS IS NOT EXIST`;
    }
  }
  check_Threats(address) {
    let check_Threats = this.get_ThreatsByAddress(address)
    if (!check_Threats || check_Threats.type !== 'THREATS') throw `THREATS IS NOT EXIST`
    return true
  }
  get_ThreatsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Threats() {
    await this.checkACT1(this.sender, 'CRIMES_AND_SECURITY_INCIDENT_OR_ASSETS')
    let Threats = await this._process.createProcess('THREATS')
    return Threats
  }
  get_Threats() {
    return this._process.getProcessByType('THREATS')
  }
  // --------------------Security_Personnel---------------------------
  check_Security_Personnel(address) {
    let check_Security_Personnel = this.get_Security_PersonnelByAddress(address)
    if (!check_Security_Personnel || check_Security_Personnel.type !== 'SECURITY_PERSONNEL') throw `SECURITY_PERSONNEL IS NOT EXIST`
    return true
  }
  get_Security_PersonnelByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Security_Personnel() {
    await this._act.checkAct(this.sender, 'LIABILITY_ISSUES')
    let Security_Personnel = await this._process.createProcess('SECURITY_PERSONNEL')
    return Security_Personnel
  }
  get_Security_Personnel() {
    return this._process.getProcessByType('SECURITY_PERSONNEL')
  }
  // --------------------Policies_and_Training---------------------------
  check_Policies_and_Training(address) {
    let check_Security_Personnel = this.get_Policies_and_TrainingByAddress(address)
    if (!check_Security_Personnel || check_Security_Personnel.type !== 'POLICIES_AND_TRAINING') throw `POLICIES_AND_TRAINING IS NOT EXIST`
    return true
  }
  get_Policies_and_TrainingByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Policies_and_Training() {
    await this.check_Security_Personnel(this.sender, 'SECURITY_PERSONNEL')
    let Policies_and_Training = await this._process.createProcess('POLICIES_AND_TRAINING')
    return Policies_and_Training
  }
  get_Policies_and_Training() {
    return this._process.getProcessByType('POLICIES_AND_TRAINING')
  }
  // --------------------Operational---------------------------
  check_Operational(address) {
    let check_Operational = this.get_OperationalByAddress(address)
    if (!check_Operational || check_Operational.type !== 'OPERATIONAL') throw `OPERATIONAL IS NOT EXIST`
    return true
  } 
  get_OperationalByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Operational() {
    await this.check_Policies_and_Training(this.sender, 'POLICIES_AND_TRAINING')
    let Operational = await this._process.createProcess('OPERATIONAL')
    return Operational
  }
  get_Operational() {
    return this._process.getProcessByType('OPERATIONAL')
  }
  // --------------------Electronic_Systems---------------------------
  check_Electronic_Systems(address) {
    let check_Electronic_Systems = this.get_Electronic_SystemsByAddress(address)
    if (!check_Electronic_Systems || check_Electronic_Systems.type !== 'ELECTRONIC_SYSTEMS') throw `ELECTRONIC_SYSTEMS IS NOT EXIST`
    return true
  }
  get_Electronic_SystemsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Electronic_Systems() {
    await this._act.checkAct(this.sender, 'LIGHTING')
    let Electronic_Systems = await this._process.createProcess('ELECTRONIC_SYSTEMS')
    return Electronic_Systems
  }
  get_Electronic_Systems() {
    return this._process.getProcessByType('ELECTRONIC_SYSTEMS')
  }
  // --------------------Design_and_Barriers---------------------------
  check_Design_and_Barriers(address) {
    let check_Design_and_Barriers = this.get_Design_and_BarriersByAddress(address)
    if (!check_Design_and_Barriers || check_Design_and_Barriers.type !== 'DESIGN_AND_BARRIERS') throw `DESIGN_AND_BARRIERS IS NOT EXIST`
    return true
  }
  get_Design_and_BarriersByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Design_and_Barriers() {
    await this.check_Electronic_Systems(this.sender, 'ELECTRONIC_SYSTEMS')
    let Design_and_Barriers = await this._process.createProcess('DESIGN_AND_BARRIERS')
    return Design_and_Barriers
  }
  get_Design_and_Barriers() {
    return this._process.getProcessByType('DESIGN_AND_BARRIERS')
  }
  // --------------------Physical---------------------------
  check_Physical(address) {
    let check_Physical = this.get_PhysicalByAddress(address)
    if (!check_Physical || check_Physical.type !== 'PHYSICAL') throw `PHYSICAL IS NOT EXIST`
    return true
  }
  get_PhysicalByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Physical() {
    await this.check_Design_and_Barriers(this.sender, 'DESIGN_AND_BARRIERS')
    let Physical = await this._process.createProcess('PHYSICAL')
    return Physical
  }
  get_Physical() {
    return this._process.getProcessByType('PHYSICAL')
  }
  // --------------------Vulnerabilities---------------------------
  checkACT2(address) {
    this.check_Threats = this.get_ThreatsByAddress(address);
    this.check_Operational = this.get_OperationalByAddress(address);
    this.check_Physical = this.get_PhysicalByAddress(address);
    if (this.check_Threats.type == 'THREATS') {
      return true;
    }
    else if (this.check_Operational.type == 'OPERATIONAL') {
      return true;
    }
    else if (this.check_Physical.type == 'PHYSICAL') {
      return true;
    }
    else {
      throw `THREATS_OR_OPERATIONAL_OR_PHYSICAL IS NOT EXIST`;
    }
  }
  check_Vulnerabilities(address) {
    let check_Vulnerabilities = this.get_VulnerabilitiesByAddress(address)
    if (!check_Vulnerabilities || check_Vulnerabilities.type !== 'VULNERABILITIES') throw `VULNERABILITIES IS NOT EXIST`
    return true
  }
  get_VulnerabilitiesByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Vulnerabilities() {
    await this.checkACT2(this.sender, 'THREATS_OR_OPERATIONAL_OR_PHYSICAL')
    let Vulnerabilities = await this._process.createProcess('VULNERABILITIES')
    return Vulnerabilities
  }
  get_Vulnerabilities() {
    return this._process.getProcessByType('VULNERABILITIES')
  }
  // --------------------Risk_Assessment---------------------------
  check_Risk_Assessment(address) {
    let check_Risk_Assessment = this.get_Risk_AssessmentByAddress(address)
    if (!check_Risk_Assessment || check_Risk_Assessment.type !== 'RISK_ASSESSMENT') throw `RISK_ASSESSMENT IS NOT EXIST`
    return true
  }
  get_Risk_AssessmentByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Risk_Assessment() {
    await this.check_Vulnerabilities(this.sender, 'VULNERABILITIES')
    let Risk_Assessment = await this._process.createProcess('RISK_ASSESSMENT')
    return Risk_Assessment
  }
  get_Risk_Assessment() {
    return this._process.getProcessByType('RISH_ASSESSMENT')
  }
  // --------------------Rish_Mitigation_Recommendations_Trade_Offs_and_Options---------------------------
  async Rish_Mitigation_Recommendations_Trade_Offs_and_Options() {
    await this.check_Risk_Assessment(this.sender, 'RISK_ASSESSMENT')
    let Rish_Mitigation = await this._process.createProcess('RISH_MITIGATION_RECOMMENTDATIONS_TRADE_OFFS_AND_OPTIONS')
    this.setToAddress(Rish_Mitigation.address)
    return 'SUCCESS'
  }
}
export default TokenMain;
