import Contract from 'Contract'
const types = ['FARM']
class Farm extends Contract {
  async createFarm (type) {
    if (!types.includes(type)) throw 'CREATE FARM FAIL'
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
  checkFarm (address, type) {
    let checkFarm = this.getFarmByAddress(address)
    if (!checkFarm || checkFarm.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getFarmByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getFarmByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Farm;