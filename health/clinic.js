import Contract from 'Contract'
class Clinic extends Contract {
  async createClinic () {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'CLINIC',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getClinicByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  checkClinic (address) {
    let check = this.getClinicByAddress(address)
    if (!check || check.type !== 'CLINIC') throw `CLINIC IS NOT EXIST`
    return true
  }
  getClinics () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'CLINIC') lists.push(account)
    })
    return lists
  }
}
export default Clinic
