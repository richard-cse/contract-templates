import Contract from 'Contract'
const types = ['SYSTEM']
class System extends Contract {
  async createSystem (type) {
    if (!types.includes(type)) throw 'CREATE SYSTEM FAIL'
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: type,
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  checkSystem (address, type) {
    let checkSystem = this.getSystemByAddress(address)
    if (!checkSystem || checkSystem.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getSystemByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getSystemByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default System;