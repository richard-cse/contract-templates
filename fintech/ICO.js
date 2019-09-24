import Contract from "Contract";
import Payment from "Payment";
class TokenMain extends Contract {
  static viewFuncs = ["getAddresses", "getTokenName", "getAccountByAddress"];
  static authenticationFuncs = ["transfer", "buyToken"];
  static owner = ["setPrice"];
  static publicFuncs = ["getAddresses", "createAccount", "getTokenName", "getAccountByAddress", "transfer", "buyToken"];
  static schemas = { tokenName: { type: String, required: true }, tokenSymbol: { type: String, required: true }, totalSupply: { type: Number, required: true }, price: { type: Number, required: true }, openSaleDate: { type: Date, required: true }, closeSaleDate: { type: Date, required: true }, accounts: [{ balance: { type: Number, default: 0 }, address: { type: String, required: true } }] };
  constructor(data) {
    super(data);
    this._payment = new Payment(data);
    this._today = new Date();
  }
  getAddresses() {
    return this.accounts;
  }
  getTokenName() {
    return this.tokenName;
  }
  async transfer(to, amount) {
    const fromAddress = this.sender; // from headers // privatekey => public key
    const walletFrom = this.getAccountByAddress(fromAddress);
    if (walletFrom.balance < amount) throw "No enough money";
    const walletTo = this.getAccountByAddress(to);
    walletFrom.balance -= amount;
    walletTo.balance += amount;
    return fromAddress;
  }
  getAccountByAddress(address) {
    return this.accounts.find(account => (account.address = address));
  }
  async createAccount() {
    const address = await this.generateAddress();
    const rs = { address: address.address, balance: 0 };
    this.accounts.push(rs);
    return address;
  }
  async buyToken(amount) {
    const openSaleDate = new Date(this.openSaleDate);
    const closeSaleDate = new Date(this.closeSaleDate);
    if (openSaleDate.getTime() > this._today.getTime()) throw "Not yet open for sale";
    if (closeSaleDate.getTime() < this._today.getTime()) throw "Close sale";
    const CSEPrice = Number(amount) * this.price;
    const addressSender = this.sender;
    const isOK = await this._payment.payment(CSEPrice);
    if (!isOK) return false;
    let wallet = this.getAccountByAddress(addressSender);
    wallet.balance += amount;
    return isOK;
  }
  setPrice(price) {
    this.price = price;
  }
  getCurrentBlock() {
    const block = this.getLastestBlock();
    return block;
  }
}
export default TokenMain;
