import Contract from 'Contract'
class Ware extends Contract {
  async createWare (type) {
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
  async addWare (type) {
    let address = await this.createWare(type)
    this.setToAddress(address)
    return { type: address }
  }
  getWareByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getWareByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Ware;