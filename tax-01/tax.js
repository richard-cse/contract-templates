import Contract from 'Contract'
const types = ["PEOPLE","MACHINE"]
class Tax extends Contract {
  async createTax (type) {
    if (!types.includes(type)) throw 'CREATE USER FAIL'
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
  checkTax (address, type) {
    let checkTax = this.getTaxByAddress(address)
    if (!checkTax || checkTax.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getTaxByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getTaxByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Tax;