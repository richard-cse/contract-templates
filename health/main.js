import Contract from 'Contract'
import Clinic from './clinic'
import User from './users'
class TokenMain extends Contract {
  static viewFuncs = [
    'getClinicByAddress',
    'getClinics',
    'getDoctors',
    'getNurses',
    'getPatients',
    'getMedicalRecordByAddress', 
    'getPatientMedicalRecords'
  ]
  static authenticationFuncs = ['createUser', 'createMedicalRecord']
  static publicFuncs = [
    'createClinic',
    'getClinicByAddress',
    'getClinics',
    'createUser',
    'getDoctors',
    'getNurses',
    'getPatients',
    'createMedicalRecord',
    'getMedicalRecordByAddress',
    'getPatientMedicalRecords'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'HEALTH CARE'
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
  }
  async createClinic() {
    let clinic = await this._clinic.createClinic()
    return clinic
  }
  getClinicByAddress(address) {
    return this._clinic.getClinicByAddress(address)
  }
  getClinics() {
    return this._clinic.getClinics()
  }
  async createUser(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2, 3].includes(Number(type))) throw 'CREATE USER FAIL'
    await this._clinic.checkClinic(this.sender)
    let user = await this._user.createUsers(type - 1, this.sender)
    this.setToAddress(user.address)
    return user
  }
  async getDoctors() {
    await this._clinic.checkClinic(this.sender)
    return this._user.getUsersByType('DOCTOR', this.sender)
  }
  async getNurses() {
    await this._clinic.checkClinic(this.sender)
    return this._user.getUsersByType('NURSE', this.sender)
  }
  async getPatients() {
    await this._clinic.checkClinic(this.sender)
    return this._user.getUsersByType('PATIENT', this.sender)
  }
  async createMedicalRecord(patientAddress) {
    let doctor = this._user.getUserByAddress(this.sender)
    if (!doctor || doctor.type !== 'DOCTOR') throw 'DOCTOR IS NOT EXIST'
    let patient = this._user.getUserByAddress(patientAddress)
    if (!patient || patient.type !== 'PATIENT') throw 'PATIENT IS NOT EXIST'
    let create = await this._user.createMedicalRecord(content, patientAddress)
    this.setToAddress(patientAddress)
    return create
  }
  getMedicalRecordByAddress(address){
    if(!this.sender) throw 'PATIENT ERROR'
    let record = this._user.getMedicalRecordByAddress(address, this.sender)
    return record
  }
  getPatientMedicalRecords(){
    if (!this.sender) throw 'PATIENT ERROR'
    let lists =  this._user.getPatientMedicalRecords(this.sender)
    return lists
  }
  
}
export default TokenMain
