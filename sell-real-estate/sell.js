import Contract from 'Contract'
class Sell extends Contract {
  async createSell (type) {
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
  async addSell (type) {
    let address = await this.createSell(type)
    this.setToAddress(address)
    return { type: address }
  }
  getSellByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getSellByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Sell;