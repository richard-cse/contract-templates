import Contract from 'Contract'
const types = ['YES', 'NO']
class QS extends Contract {
  async createQS (type, clinicAddress) {
    console.log(type)
    if (!types.includes(types[type])) throw 'CREATE QS FAIL'
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: types[type],
      Process: processAddress,
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return { type: types[type], address }
  }
  checkQS (address, type) {
    let checkQS = this.getQSByAddress(address)
    if (!checkQS || checkQS.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getQSByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getQSByType (type, processAddress) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type && account.process === processAddress) {
        lists.push(account)
      }
    })
    return lists
  }
 
}
export default QS