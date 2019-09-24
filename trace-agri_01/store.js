import Contract from 'Contract'
class Store extends Contract {
  async createStore () {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'STORE',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getStoreByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getStores () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'STORE') lists.push(account)
    })
    return lists
  }
}
export default Store
