import Contract from 'Contract'
class Fruit extends Contract {
  async createFruit () {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'FRUIT',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getFruitByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getFruits () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'FRUIT') lists.push(account)
    })
    return lists
  }
}
export default Fruit
