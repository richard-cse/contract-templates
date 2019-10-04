import Contract from 'Contract'
import User from './user'
import QS from './QS'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Customer_Payment_Processing',
    'get_Receive_Payment_in_Mail',
    'get_Does_Payment_correspond_to_Outstanding_Invoice',
    'getYes',
    'get_getNo',
    'get_Forward_Coppy_of_check_to_Sales_Dept_to_Write_Order',
    'get_Create_Invoice_for_Order',
    'get_Match_Payment_to_Invoice',
    'get_Amounts_Match',
    'getYes',
    'getNo',
    'get_Is_Discrepancy_an_Overpayment_$500',
    'getYes',
    'getNo',
    'get_Write_off_Discrepancy',
    'get_Is_Discrepancy_an_Overpayment',
    'getYes',
    'getNo',
    'get_Issue_Refund_for_Amount_of_Overpaymnet',
    'get_Cotact_Customer_to_Request_Balance_of_Payment'

  ]
  static authenticationFuncs = [
    'Does_Payment_correspond_to_Outstanding_Invoice',
    'Forward_Coppy_of_check_to_Sales_Dept_to_Write_Order',
    'Create_Invoice_for_Order',
    'Match_Payment_to_Invoice',
    'Amounts_Match',
    'Is_Discrepancy_an_Overpayment_$500',
    'Write_off_Discrepancy',
    'Is_Discrepancy_an_Overpayment',
    'Issue_Refund_for_Amount_of_Overpaymnet',
    'Cotact_Customer_to_Request_Balance_of_Payment'
  ]
  static publicFuncs = [
    'Customer_Payment_Processing',
    'Receive_Payment_in_Mail',
    'Does_Payment_correspond_to_Outstanding_Invoice',
    'getYes',
    'getNo',
    'Forward_Coppy_of_check_to_Sales_Dept_to_Write_Order',
    'Create_Invoice_for_Order',
    'Match_Payment_to_Invoice',
    'Amounts_Match',
    'Is_Discrepancy_an_Overpayment_$500',
    'Write_off_Discrepancy',
    'Is_Discrepancy_an_Overpayment',
    'getYes',
    'getNo',
    'Issue_Refund_for_Amount_of_Overpaymnet',
    'Cotact_Customer_to_Request_Balance_of_Payment'


  ]
  static schemas = {
    name: {
      type: String,
      default: 'PAYMENT_GATEWAY'
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
    this._user = new User(data)
    this._QS = new QS(data)
    this._process - new Process(data)
  }

  //---------------------Customer_Payment_Processing------------------------------

  async Customer_Payment_Processing() {
    let customer = await this._user.createUser('CUSTOMER_PAYMENT_PROCESSING')
    return customer

  }
  get_Customer_Payment_Processing() {
    let customer = this._user.getUserByType('CUSTOMER_PAYMENT_PROCESSING')
    return customer
  }


  // --------------------Receive_Payment_in_Mail--------------------------
  checkReceive_Payment_in_Mail(address) {
    let checkReceive_Payment_in_Mail = this.getReceive_Payment_in_MailByAddress(address)
    if (!checkReceive_Payment_in_Mail || checkReceive_Payment_in_Mail.type !== 'RECEIVE_PAYMENT_IN_MAIL') throw `RECEIVE_PAYMENT_IN_MAIL IS NOT EXIST`
    return true
  }
  getReceive_Payment_in_MailByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }

  async Receive_Payment_in_Mail() {
    this._user.checkUser(this.sender, 'CUSTOMER_PAYMENT_PROCESSING')
    let receive = await this._process.createProcess('RECEIVE_PAYMENT_IN_MAIL')
    return receive

  }

  get_Receive_Payment_in_Mail() {
    return this._process.getProcessByType('RECEIVE_PAYMENT_IN_MAIL')
  }

  // --------------------Does_Payment_correspond_to_Outstanding_Invoice---------------------------

  async creatDoes_Payment_correspond_to_Outstanding_InvoiceeUser(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2].includes(Number(type))) throw 'CREATE QS FAIL'
    await this._process.checkProcess(this.sender)
    let QS = await this._QS.createQS(type - 1, this.sender)
    this.setToAddress(QS.address)
    return QS
  }
  async getYes() {
    await this._process.checkProcess(this.sender)
    return this._QS.getQSsByType('YES', this.sender)
  }
  async getNo() {
    await this._process.checkProcess(this.sender)
    return this._QS.getQSsByType('NO', this.sender)
  }

  // --------------------Forward_Coppy_of_check_to_Sales_Dept_to_Write_Order---------------------------

  checkForward_Coppy_of_check_to_Sales_Dept_to_Write_Order(address) {
    let checkForward_Coppy_of_check_to_Sales_Dept_to_Write_Order = this.getForward_Coppy_of_check_to_Sales_Dept_to_Write_OrderByAddress(address)
    if (!checkForward_Coppy_of_check_to_Sales_Dept_to_Write_Order || checkForward_Coppy_of_check_to_Sales_Dept_to_Write_Order.type !== 'FORWARD_COPPY_OF_CHECK_TO_SALES_DEPT_TO_WRITE_ORDER') throw `FORWARD_COPPY_OF_CHECK_TO_SALES_DEPT_TO_WRITE_ORDER IS NOT EXIST`
    return true
  }
  getForward_Coppy_of_check_to_Sales_Dept_to_Write_OrderByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }

  async Forward_Coppy_of_check_to_Sales_Dept_to_Write_Order$8450(address_Does_Payment_correspond_to_Outstanding_Invoice) {
    let yes = this._QS.getQSByAddress(this.sender)
    if (!yes || yes.type !== 'YES') throw 'YES IS NOT EXIST'
    let no = this._QS.getQSByAddress(address_Does_Payment_correspond_to_Outstanding_Invoice)
    if (!no || no.type !== 'NO') throw 'NO IS NOT EXIST'
    let forward = await this._process.createProcess('FORWARD_COPPY_OF_CHECK_TO_SALES_DEPT_TO_WRITE_ORDER')
    return forward
  }


  // --------------------Create_Invoice_for_Order---------------------------
  checkCreate_Invoice_for_Order(address) {
    let checkCreate_Invoice_for_Order = this.getCreate_Invoice_for_OrderByAddress(address)
    if (!checkFCreate_Invoice_for_Order || checkCreate_Invoice_for_Order.type !== 'CREATE_INVOICE_FOR_ORDER') throw `CREATE_INVOICE_FOR_ORDER IS NOT EXIST`
    return true
  }
  getCreate_Invoice_for_OrderByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }


  async Create_Invoice_for_Order() {
    this.checkForward_Coppy_of_check_to_Sales_Dept_to_Write_Order(this.sender, 'FORWARD_COPPY_OF_CHECK_TO_SALES_DEPT_TO_WRITE_ORDER')
    let receive = await this._process.createProcess('CREATE_INVOICE_FOR_ORDER')
    return receive

  }

  get_Create_Invoice_for_Order() {
    return this._process.getProcessByType('FORWARD_COPPY_OF_CHECK_TO_SALES_DEPT_TO_WRITE_ORDER')
  }

  // --------------------Match_Payment_to_Invoice---------------------------
  checkMatch_Payment_to_Invoice(address) {
    let checkMatch_Payment_to_Invoice = this.getMatch_Payment_to_InvoiceByAddress(address)
    if (!checkMatch_Payment_to_Invoice || checkMatch_Payment_to_Invoice.type !== 'MATCH_PAYMENT_TO_INVOICE') throw `MATCH_PAYMENT_TO_INVOICE IS NOT EXIST`
    return true
  }
  getMatch_Payment_to_InvoiceByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }


  async Create_Invoice_for_Order() {
    this.checkCreate_Invoice_for_Order(this.sender, 'FORWARD_COPPY_OF_CHECK_TO_SALES_DEPT_TO_WRITE_ORDER')
    let match= await this._process.createProcess('MATCH_PAYMENT_TO_INVOICE')
    return match

  }

  get_Create_Invoice_for_Order() {
    return this._process.getProcessByType('MATCH_PAYMENT_TO_INVOICE')
  }

  // -------------------Amounts_Match ---------------------------

  checkAmounts_Match(address) {
    let checkAmounts_Match = this.getAmounts_MatchByAddress(address)
    if (!checkAmounts_Match || checkAmounts_Match.type !== 'AMOUNT_MATCH') throw `AMOUNT_MATCH IS NOT EXIST`
    return true
  }
  getAmounts_MatchByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }


  async Amounts_Match() {
    this.checkMatch_Payment_to_Invoice(this.sender, 'MATCH_PAYMENT_TO_INVOICE')
    let match= await this._process.createProcess('AMOUNT_MATCH')
    return match

  }

  get_Amounts_Match () {
    return this._process.getProcessByType('AMOUNT_MATCH')
  }

  // --------------------Is_Discrepancy_an_Overpayment_$500 ---------------------------

  checkIs_Discrepancy_an_Overpayment_$500(address) {
    let checkIs_Discrepancy_an_Overpayment_$500 = this.getIs_Discrepancy_an_Overpayment_$500ByAddress(address)
    if (!checkIs_Discrepancy_an_Overpayment_$500 || checkIs_Discrepancy_an_Overpayment_$500.type !== 'IS_DISCREPANCY_AN_OVERPAYMENT_$500') throw `IS_DISCREPANCY_AN_OVERPAYMENT_$500 IS NOT EXIST`
    return true
  }
  getIs_Discrepancy_an_Overpayment_$500ByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }


  async Is_Discrepancy_an_Overpayment_$500() {
    this.checkAmounts_Match(this.sender, 'AMOUNT_MATCH')
    let is= await this._process.createProcess('IS_DISCREPANCY_AN_OVERPAYMENT_$500')
    return is

  }

  get_Is_Discrepancy_an_Overpayment_$500 () {
    return this._process.getProcessByType('IS_DISCREPANCY_AN_OVERPAYMENT_$500')
  }
  
  // --------------------Write_off_Discrepancy ---------------------------

  checkWrite_off_Discrepancy(address) {
    let checkWrite_off_Discrepancy = this.getWrite_off_DiscrepancyByAddress(address)
    if (!checkWrite_off_Discrepancy || checkWrite_off_Discrepancy.type !== 'WRITE_OFF_DISCREPANCY') throw `WRITE_OFF_DISCREPANCY IS NOT EXIST`
    return true
  }
  getWrite_off_DiscrepancyByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }


  async Write_off_Discrepancy() {
    this.checkIs_Discrepancy_an_Overpayment_$500(this.sender, 'IS_DISCREPANCY_AN_OVERPAYMENT_$500')
    let write= await this._process.createProcess('IWRITE_OFF_DISCREPANCY')
    return write

  }

  get_Write_off_Discrepancy() {
    return this._process.getProcessByType('WRITE_OFF_DISCREPANCY')
  }
  // --------------------Is_Discrepancy_an_Overpayment ---------------------------

  checkIs_Discrepancy_an_Overpayment(address) {
    let checkIs_Discrepancy_an_Overpayment = this.getIs_Discrepancy_an_OverpaymentByAddress(address)
    if (!checkIs_Discrepancy_an_Overpayment || checkIs_Discrepancy_an_Overpayment.type !== 'IS_DISCREPANCY_AN_OVERPAYMENT') throw `IS_DISCREPANCY_AN_OVERPAYMENT IS NOT EXIST`
    return true
  }
  getIs_Discrepancy_an_OverpaymentByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }


  async Is_Discrepancy_an_Overpayment() {
    this.checkAmounts_Match(this.sender, 'AMOUNT_MATCH')
    let write= await this._process.createProcess('IS_DISCREPANCY_AN_OVERPAYMENT')
    return write

  }

  get_Is_Discrepancy_an_Overpayment() {
    return this._process.getProcessByType('IS_DISCREPANCY_AN_OVERPAYMENT')
  }
  // --------------------Issue_Refund_for_Amount_of_Overpaymnet ---------------------------

  checkIssue_Refund_for_Amount_of_Overpaymnet(address) {
    let checkWrite_off_Discrepancy = this.getWrite_off_DiscrepancyByAddress(address)
    if (!checkWrite_off_Discrepancy || checkWrite_off_Discrepancy.type !== 'WRITE_OFF_DISCREPANCY') throw `WRITE_OFF_DISCREPANCY IS NOT EXIST`
    return true
  }
  getWrite_off_DiscrepancyByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }


  async Write_off_Discrepancy() {
    this.checkIs_Discrepancy_an_Overpayment(this.sender, 'IS_DISCREPANCY_AN_OVERPAYMENT')
    let write= await this._process.createProcess('IWRITE_OFF_DISCREPANCY')
    return write

  }
   // --------------------Cotact_Customer_to_Request_Balance_of_Payment ---------------------------
   checkCotact_Customer_to_Request_Balance_of_Payment(address) {
    let checkCotact_Customer_to_Request_Balance_of_Payment = this.getCotact_Customer_to_Request_Balance_of_PaymentByAddress(address)
    if (!checkCotact_Customer_to_Request_Balance_of_Payment || checkCotact_Customer_to_Request_Balance_of_Payment.type !== 'CONTACT_CUSTOMER_TO_REQUEST_BALANCE_OF_PAYMENT') throw `CONTACT_CUSTOMER_TO_REQUEST_BALANCE_OF_PAYMENT IS NOT EXIST`
    return true
  }
  getCotact_Customer_to_Request_Balance_of_PaymentByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }


  async Cotact_Customer_to_Request_Balance_of_Payment() {
    this.checkIs_Discrepancy_an_Overpayment(this.sender, 'IS_DISCREPANCY_AN_OVERPAYMENT')
    let contact= await this._process.createProcess('CONTACT_CUSTOMER_TO_REQUEST_BALANCE_OF_PAYMENT')
    return contact

  }

  get_Cotact_Customer_to_Request_Balance_of_Payment() {
    return this._process.getProcessByType('CONTACT_CUSTOMER_TO_REQUEST_BALANCE_OF_PAYMENT')
  }
}
export default TokenMain;
