import Contract from 'Contract'
class Box extends Contract {
  async createBox () {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'BOX',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getBoxByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getBoxes () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'BOX') lists.push(account)
    })
    return lists
  }
}
export default Box
