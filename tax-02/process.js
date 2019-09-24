import Contract from 'Contract'

const types =[ 
    'EMPLOYERS_SEND_W_2S_TO_SSA',
    'IRS_SEND_DATA_ON_SELF_EMPLOYMENT_IMCOME_TO_SSA',
    'HISTORICAL_ECONOMIC_DATA_FROM_BLS_AND_BEA',
    'ECONOMIC_ASSUMPTIONS_FROM_OMB',
    'QUARTERLY_WAGES_BY_EMPLOYER_FROM_IRS']
class Process extends Contract {
  async createProcess(type) {
    if (!types.includes(type)) throw 'CREATE PROCESS FAIL'
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
  checkProcess(address, type) {
    let checkProcess = this.getProcessByAddress(address)
    if (!checkProcess || checkProcess.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getProcessByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  getProcessByType(type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Process;