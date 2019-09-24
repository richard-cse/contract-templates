import Contract from 'Contract'
const types =[ 'COMPANY','CUSTOMER']
class Ob extends Contract {
  async createOb(type) {
    if (!types.includes(type)) throw 'CREATE OBJECT FAIL'
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
  checkOb(address, type) {
    let checOb = this.getObByAddress(address)
    if (!checOb || checOb.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getObByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  getObByType(type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Ob;