import Contract from 'Contract'
const types = ['LOW', 'MEDIUM', 'HIGH']
class Level extends Contract {
  async createLevel (type, clinicAddress) {
    console.log(type)
    if (!types.includes(types[type])) throw 'CREATE LEVEL FAIL'
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: types[type],
      process: processAddress,
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return { type: types[type], address }
  }
  checkLevel (address, type) {
    let checkLevel = this.getLevelByAddress(address)
    if (!checkLevel || checkLevel.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getLevelByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getLevelByType (type, processAddress) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type && account.process === processAddress) {
        lists.push(account)
      }
    })
    return lists
  }
  
}
export default Level
