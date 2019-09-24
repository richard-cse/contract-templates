import Contract from 'Contract'
const types = ['DOCTOR', 'NURSE', 'PATIENT']
class Users extends Contract {
  async createUsers (type, clinicAddress) {
    console.log(type)
    if (!types.includes(types[type])) throw 'CREATE USER FAIL'
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: types[type],
      clinic: clinicAddress,
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return { type: types[type], address }
  }
  checkUser (address, type) {
    let checkUser = this.getUserByAddress(address)
    if (!checkUser || checkUser.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getUserByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getUsersByType (type, clinicAddress) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type && account.clinic === clinicAddress) {
        lists.push(account)
      }
    })
    return lists
  }
  async createMedicalRecord (content, patientAddress) {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'MEDICAL_RECORD',
      patientAddress,
      address: address.address,
      content,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getMedicalRecordByAddress (address, patientAddress) {
    let record = this.getUserByAddress(address)
    if (
      !record ||
      record.type !== 'MEDICAL_RECORD' ||
      record.patientAddress !== patientAddress
    ) {
      throw `MEDICAL RECORD IS NOT EXIST`
    }
    return record
  }
  getPatientMedicalRecords (address) {
    let lists = []
    this.accounts.find(account => {
      if(account.patientAddress === address) lists.push(account)
    })
    return lists
  }
}
export default Users
