import Contract from 'Contract'
const types = ['SELLER','REALTOR']
class Obj extends Contract {
  async createObj (type) {
    if (!types.includes(type)) throw 'CREATE OBJ FAIL'
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
  checkObj(address, type) {
    let checkObj = this.getObjByAddress(address)
    if (!checkObj || checkObj.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getObjByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getObjByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Obj;