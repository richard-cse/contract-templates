import Contract from 'Contract'
import Payment from 'Payment'
class TokenMain extends Contract {
  static viewFuncs = ['getAddresses', 'getTokenName', 'getAccountByAddress']
  static authenticationFuncs = ['Transaction']
  static owner = ['setPrice']
  static publicFuncs = [
    'getTokenName',
    'getAccountByAddress',
    'getAddresses',
    'createAccount',
    'Transaction',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'ECOMMERCE-ORDERS'
    },
    tokenName: {
      type: String,
      required: true
    },
    accounts: [{
      balance: {
        type: Number,
        default: 0
      },
      address: {
        type: String,
        required: true
      }
    }]
  }
  constructor(data) {
    super(data)
    this._payment = new Payment(data)
  }
  getAddresses() {
    return this.accounts;
  }
  getTokenName() {
    return this.tokenName;
  }
  async Transaction(Opico, amount) {
    if (!amount) throw 'not have amount'
    const CustomerAddress = this.sender // from headers // privatekey => public key
    const walletCustomer = this.getAccountByAddress(CustomerAddress)
    if (!walletCustomer) throw 'FROM_ADDRESS_INVALID'
    if (walletCustomer.balance < amount) throw 'No enough money'
    const walletOpico = this.getAccountByAddress(Opico)
    if (!walletOpico) throw 'TO_ADDRESS_INVALID'
    this.setToAddress(walletOpico.address)
    // subtract from wallet
    walletCustomer.balance -= amount
    // add to wallet
    walletOpico.balance += amount
    return CustomerAddress
  }
  getAccountByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createAccount() {
    // create address
    const address = await this.generateAddress()
    // save to db
    const rs = {
      address: address.address,
      balance: 0
    }
    this.accounts.push(rs)
    return address
  }
}
export default TokenMain