import Contract from 'Contract'
class Process extends Contract {
  async createProcess () {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'PROCESS',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getProcessByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  checkProcess (address) {
    let check = this.getClinicByAddress(address)
    if (!check || check.type !== 'PROCESS') throw `PROCESS IS NOT EXIST`
    return true
  }
  getProcess () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'PROCESS') lists.push(account)
    })
    return lists
  }
}
export default Process
