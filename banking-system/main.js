import Contract from 'Contract'
import Act from './act'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Interest_document',
    'get_Deposit_process',
    'get_With_draw_process',
    'get_Cash_library',
    'get_Deposit_book_cash',
    'get_Deposit_book',
    'get_Depositor',
    'get_Deposit_book_deposit_and_with_draw_slip',
    'get_Business_Category1',
  ]
  static authenticationFuncs = [
    'Deposit_process',
    'With_draw_process',
    'Cash_library',
    'Deposit_book_cash',
    'Deposit_book',
    'Depositor',
    'Deposit_book_deposit_and_with_draw_slip',
    'Business_Category1',
    'With_draw_slip',
    'Deposit_book_deposit_slip',
  ]
  static publicFuncs = [
    'Interest_document',
    'get_Interest_document',
    'Deposit_process',
    'get_Deposit_process',
    'With_draw_process',
    'get_With_draw_process',
    'Account',
    'get_Acount',
    'Cash_library',
    'get_Cash_library',
    'Deposit_book_cash',
    'get_Deposit_book_cash',
    'Depositor',
    'get_Depositor',
    'Deposit_book',
    'get_Deposit_book',
    'Deposit_book_deposit_and_with_draw_slip',
    'get_Deposit_book_deposit_and_with_draw_slip',
    'Business_Category1',
    'get_Business_Category1',
    'With_draw_slip_deposit_book',
    'Deposit_book_deposit_slip'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'BANKING_SYSTEM'
    },
    accounts: [
      {
        type: {
          type: String,
          default: 0
        },
        address: {
          type: String,
          required: true
        }
      }
    ]
  }
  constructor(data) {
    super(data)
    this._act = new Act(data)
    this._process = new Process(data)
  }
  //---------------------Interest_document------------------------------
  async Interest_document() {
    let Interes = await this._act.createAct('INTEREST_DOCUMENT')
    return Interes
  }
  get_Interest_document() {
    let Interes = this._act.getActByType('INTEREST_DOCUMENT')
    return Interes
  }
  // --------------------Deposit_process---------------------------
  checkDeposit_process(address) {
    let checkDeposit_process = this.getDeposit_processByAddress(address)
    if (!checkDeposit_process || checkDeposit_process.type !== 'DEPOSIT_PROCESS') throw `DEPOSIT_PROCESS IS NOT EXIST`
    return true
  }
  getDeposit_processByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  checkProcess2(address) {
    this.checkAccount = this.getDeposit_processByAddress(address);
    this._act.checkAct = this._act.getActByAddress(address);
    if (this.checkAccount.type == 'ACCOUNT') {
      return true;
    }
    else if (this._act.checkAct.type == 'INTEREST_DOCUMENT') {
      return true;
    }
    else {
      throw `ACCOUNT_OR_INTEREST_DOCUMENT IS NOT EXIST`;
    }
  }
  async Deposit_process() {
    await this.checkProcess2(this.sender, 'ACCOUNT_OR_INTEREST_DOCUMENT')
    let deposit = await this._process.createProcess('DEPOSIT_PROCESS')
    return deposit
  }
  get_Deposit_process() {
    return this._process.getProcessByType('DEPOSIT_PROCESS')
  }
  // --------------------Cash_library---------------------------
  checkCash_library(address) {
    let checkCash_library = this.getCash_libraryByAddress(address)
    if (!checkCash_library || checkCash_library.type !== 'CASH_LIBRARY') throw `CASH_LIBRARY IS NOT EXIST`
    return true
  }
  getCash_libraryByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Cash_library() {
    await this.checkDeposit_process(this.sender, 'DEPOSIT_PROCESS')
    let Cash_library = await this._process.createProcess('CASH_LIBRARY')
    return Cash_library
  }
  get_Cash_library() {
    return this._process.getProcessByType('CASH_LIBRARY')
  }
  // --------------------Deposit_book---------------------------
  checkDeposit_book(address) {
    let checkDeposit_book = this.getDeposit_bookByAddress(address)
    if (!checkDeposit_book || checkDeposit_book.type !== 'DEPOSIT_BOOK') throw `DEPOSIT_BOOK IS NOT EXIST`
    return true
  }
  getDeposit_bookByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Deposit_book() {
    await this.checkDeposit_process(this.sender, 'DEPOSIT_PROCESS')
    let Deposit_book = await this._process.createProcess('DEPOSIT_BOOK')
    return Deposit_book
  }
  get_Deposit_book() {
    return this._process.getProcessByType('3RD_GRADE')
  }
  // --------------------With_draw_process--------------------------
  checkWith_draw_process(address) {
    let checkWith_draw_process = this.getWith_draw_processByAddress(address)
    if (!checkWith_draw_process || checkWith_draw_process.type !== 'WITH_DRAW_PROCESS') throw `WITH_DRAW_PROCESS IS NOT EXIST`
    return true
  }
  getWith_draw_processByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  checkProcess1(address) {
    this.checkCash_library = this.getWith_draw_processByAddress(address);
    this.checkAccount = this.getDeposit_processByAddress(address);
    this._act.checkAct = this._act.getActByAddress(address);
    if (this.checkCash_library.type == 'CASH_LIBRARY') {
      return true;
    }
    else if (this.checkAccount.type == 'ACCOUNT') {
      return true;
    }
    else if (this._act.checkAct.type == 'INTEREST_DOCUMENT') {
      return true;
    }
    else {
      throw `CASH_LIBRARY_OR_ACCOUNT_OR_INTEREST_DOCUMENT IS NOT EXIST`;
    }
  }
  async With_draw_process() {
    await this.checkProcess1(this.sender, 'CASH_LIBRARY_OR_ACCOUNT_OR_INTEREST_DOCUMENT')
    let draw = await this._process.createProcess('WITH_DRAW_PROCESS')
    return draw
  }
  get_With_draw_process() {
    return this._process.getProcessByType('WITH_DRAW_PROCESS')
  }
  // --------------------Deposit_book_cash---------------------------
  checkDeposit_book_cash(address) {
    let checkDeposit_book_cash = this.getDeposit_book_cashByAddress(address)
    if (!checkDeposit_book_cash || checkDeposit_book_cash.type !== 'DEPOSIT_BOOK_CASH') throw `DEPOSIT_BOOK_CASH IS NOT EXIST`
    return true
  }
  getDeposit_book_cashByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Deposit_book_cash() {
    await this.checkWith_draw_process(this.sender, 'WITH_DRAW_PROCESS')
    let Deposit1 = await this._process.createProcess('DEPOSIT_BOOK_CASH')
    return Deposit1
  }
  get_Deposit_book_cash() {
    return this._process.getProcessByType('DEPOSIT_BOOK_CASH')
  }
  // --------------------Account---------------------------
  checkAccount(address) {
    let checkAccount = this.getAccountByAddress(address)
    if (!checkAccount || checkAccount.type !== 'ACCOUNT') throw `ACCOUNT IS NOT EXIST`
    return true
  }
  getAccountByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  checkProcess(address) {
    this.checkWith_draw_process = this.getWith_draw_processByAddress(address);
    this.checkDeposit_process = this.getDeposit_processByAddress(address);

    if (this.checkWith_draw_process.type == 'WITH_DRAW_PROCESS') {
      return true;
    }
    else if (this.checkDeposit_process.type == 'DEPOSIT_PROCESS') {
      return true;
    }
    else {
      throw `WITH_DRAW_PROCESS_OR_DEPOSIT_PROCESS IS NOT EXIST`;
    }
  }
  async Account() {
    await this.checkProcess(this.sender, 'WITH_DRAW_PROCESS_OR_DEPOSIT_PROCESS')
    let Deposit2 = await this._process.createProcess('ACCOUNT')
    return Deposit2
  }
  get_Account() {
    return this._process.getProcessByType('ACCOUNT')
  }
  // --------------------Depositor ---------------------------
  checkDeposit(address) {
    this.checkDeposit_book_cash = this.getDeposit_book_cashByAddress(address);
    this.checkDeposit = this.getDeposit_bookByAddress(address);

    if (this.checkDeposit_book_cash.type == 'DEPOSIT_BOOK_CASH') {
      return true;
    }
    else if (this.checkDeposit.type == 'DEPOSIT_BOOK') {
      return true;
    }
    else {
      throw `DEPOSIT_BOOK_CASH_OR_DEPOSIT_BOOK IS NOT EXIST`;
    }
  }
  checkDepositor(address) {
    let checkDepositor = this.getDepositorByAddress(address)
    if (!checkDepositor || checkDepositor.type !== 'DEPOSITOR') throw `DEPOSITOR IS NOT EXIST`
    return true
  }
  getDepositorByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Depositor() {
    await this.checkDeposit(this.sender, 'DEPOSIT_BOOK_CASH_OR_DEPOSIT_BOOK')
    let Depositor = await this._process.createProcess('DEPOSITOR')
    return Depositor
  }
  get_Depositor() {
    return this._process.getProcessByType('DEPOSITOR')
  }
  // --------------------Deposit_book_deposit_and_with_draw_slip ---------------------------
  checkDeposit_book_deposit_and_with_draw_slip(address) {
    let checkDeposit_book_deposit_and_with_draw_slip = this.getDeposit_book_deposit_and_with_draw_slipByAddress(address)
    if (!checkDeposit_book_deposit_and_with_draw_slip || checkDeposit_book_deposit_and_with_draw_slip.type !== 'DEPOSIT_BOOK_DEPOSIT_AND_WITH_DRAW_SLIP') throw `DEPOSIT_BOOK_DEPOSIT_AND_WITH_DRAW_SLIP IS NOT EXIST`
    return true
  }
  getDeposit_book_deposit_and_with_draw_slipByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Deposit_book_deposit_and_with_draw_slip() {
    await this.checkDeposit(this.sender, 'DEPOSITOR')
    let Depositor = await this._process.createProcess('DEPOSIT_BOOK_DEPOSIT_AND_WITH_DRAW_SLIP')
    return Depositor
  }
  get_Deposit_book_deposit_and_with_draw_slip() {
    return this._process.getProcessByType('DEPOSIT_BOOK_DEPOSIT_AND_WITH_DRAW_SLIP')
  }
  // --------------------Business_Category1 ---------------------------
  checkBusiness_Category1(address) {
    let checkBusiness_Category1 = this.getBusiness_Category1ByAddress(address)
    if (!checkBusiness_Category1 || checkBusiness_Category1.type !== 'BUSINESS_CATEGORY') throw `BUSINESS_CATEGORY IS NOT EXIST`
    return true
  }
  getBusiness_Category1ByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Business_Category1() {
    await this.checkDeposit_book_deposit_and_with_draw_slip(this.sender, 'DEPOSIT_BOOK_DEPOSIT_AND_WITH_DRAW_SLIP')
    let Business_Category1 = await this._process.createProcess('BUSINESS_CATEGORY')
    return Business_Category1
  }
  get_Business_Category1() {
    return this._process.getProcessByType('BUSINESS_CATEGORY')
  }
  // --------------------With_draw_slip_deposit_book ---------------------------
  async With_draw_slip_deposit_book() {
    await this.checkBusiness_Category1(this.sender, 'BUSINESS_CATEGORY')
    let slip = await this._process.createProcess('WITH_DRAW_SLIP_DEPOSIT_BOOK')
    this.setToAddress(slip.address)
    return { slip }
  }
  // --------------------Deposit_book_deposit_slip ---------------------------
  async Deposit_book_deposit_slip() {
    await this.checkBusiness_Category1(this.sender, 'BUSINESS_CATEGORY')
    let book = await this._process.createProcess('DEPOSIT_BOOK_FEPOSIT_SLIP')
    this.setToAddress(book.address)
    return { book }
  }
}
export default TokenMain;
