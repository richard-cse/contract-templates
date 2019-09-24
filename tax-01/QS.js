import Contract from 'Contract'
class QS extends Contract {
  async createQS (type) {
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
  async addQS (type) {
    let address = await this.createQS(type)
    this.setToAddress(address)
    return { type: address }
  }
  getQSByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getQSByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default QS;