import Contract from 'Contract'
import System from './system'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_System',
    'get_Order_recceived',
    'get_Cancle_Order',
    'get_Order_canceled',
    'get_Do_not_cancle_order',
    'get_Start_Order_Processing',
    'get_Handle_Payment',
    'get_Do_not_Capture_Online',
    'get_Receive_Money_offline',
    'get_Capture_Online',
    'get_check_Create_invoice1',
    'get_Create_invoice',
    'get_Handle_Shipment',
    'get_Ship_Product_to_get_Tracking_Number',
    'get_Create_Shipment_with_Tracking_Number',
    'get_Check_Order_Complete',
  ]
  static authenticationFuncs = [
    'Order_recceived',
    'Cancle_Order',
    'Order_canceled',
    'Do_not_cancle_order',
    'Start_Order_Processing',
    'Handle_Payment',
    'Do_not_Capture_Online',
    'Receive_Money_offline',
    'Capture_Online',
    'check_Create_invoice',
    'Create_invoice',
    'Handle_Shipment',
    'Ship_Product_to_get_Tracking_Number',
    'Create_Shipment_with_Tracking_Number',
    'Check_Order_Complete',
    'Order_Complete'
  ]
  static publicFuncs = [
    'System',
    'get_System',
    'Order_recceived',
    'get_Order_recceived',
    'Cancle_Order',
    'get_Cancle_Order',
    'Order_canceled',
    'get_Order_canceled',
    'Do_not_cancle_order',
    'get_Do_not_cancle_order',
    'Start_Order_Processing',
    'get_Start_Order_Processing',
    'Handle_Payment',
    'get_Handle_Payment',
    'Do_not_Capture_Online',
    'get_Do_not_Capture_Online',
    'Receive_Money_offline',
    'get_Receive_Money_offline',
    'Capture_Online',
    'get_Capture_Online',
    'check_Create_invoice1',
    'get_check_Create_invoice1',
    'Create_invoice',
    'get_Create_invoice',
    'Handle_Shipment',
    'get_Handle_Shipment',
    'Ship_Product_to_get_Tracking_Number',
    'get_Ship_Product_to_get_Tracking_Number',
    'Create_Shipment_with_Tracking_Number',
    'get_Create_Shipment_with_Tracking_Number',
    'Check_Order_Complete',
    'get_Check_Order_Complete',
    'Order_Complete'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'E-COMMERCE-02'
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
    this._system = new System(data)
    this._process = new Process(data)
  }
  //---------------------System------------------------------
  async System() {
    let System = await this._system.createSystem('SYSTEM')
    return System
  }
  get_System() {
    let System = this._system.getSystemByType('SYSTEM')
    return System
  }
  // --------------------Order_recceived---------------------------
  async Order_recceived() {
    await this._system.checkSystem(this.sender, 'SYSTEM')
    let Order_recceived = await this._process.createProcess('ORDER_RECEIVED')
    return Order_recceived
  }
  get_Order_recceived() {
    return this._process.getProcessByType('ORDER_RECEIVED')
  }
  // --------------------Cancle_Order---------------------------
  async Cancle_Order(address_Order_recceived) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_Order_recceived = this._process.getProcessByAddress(address_Order_recceived)
    if (!check_Order_recceived || check_Order_recceived.type !== 'ORDER_RECEIVED')
      throw 'ORDER_RECEIVED IS NOT EXIST'
    let Cancle_Order = await this._process.createProcess('CANCLE_ORDER')
    return Cancle_Order
  }
  get_Cancle_Order() {
    return this._process.getProcessByType('CANCLE_ORDER')
  }
  // --------------------Order_canceled---------------------------
  async Order_canceled(address_Cancle_Order) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_Cancle_Order = this._process.getProcessByAddress(address_Cancle_Order)
    if (!check_Cancle_Order || check_Cancle_Order.type !== 'CANCLE_ORDER')
      throw 'CANCLE_ORDER IS NOT EXIST'
    let Order_cancle = await this._process.createProcess('ORDER_CANCELED')
    return Order_cancle
  }
  get_Order_canceled() {
    return this._process.getProcessByType('ORDER_CANCELED')
  }
  // --------------------Do_not_cancle_order---------------------------
  async Do_not_cancle_order(address_Order_recceived) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_Order_recceived = this._process.getProcessByAddress(address_Order_recceived)
    if (!check_Order_recceived || check_Order_recceived.type !== 'ORDER_RECEIVED')
      throw 'ORDER_RECEIVED IS NOT EXIST'
    let Do_not_cancle_order = await this._process.createProcess('DO_NOT_CANCLE_ORDER')
    return Do_not_cancle_order
  }
  get_Do_not_cancle_order() {
    return this._process.getProcessByType('DO_NOT_CANCLE_ORDER')
  }
  // --------------------Start_Order_Processing---------------------------
  async Start_Order_Processing(address_Do_not_cancle_order) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_Do_not_cancle_order = this._process.getProcessByAddress(address_Do_not_cancle_order)
    if (!check_Do_not_cancle_order || check_Do_not_cancle_order.type !== 'DO_NOT_CANCLE_ORDER')
      throw 'DO_NOT_CANCLE_ORDER IS NOT EXIST'
    let Start_Order_Processing = await this._process.createProcess('START_ORDER_PROCESSING')
    return Start_Order_Processing
  }
  get_Start_Order_Processing() {
    return this._process.getProcessByType('START_ORDER_PROCESSING')
  }
  // --------------------Handle_Payment---------------------------
  async Handle_Payment(address_Start_Order_Processing) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_Start_Order_Processing = this._process.getProcessByAddress(address_Start_Order_Processing)
    if (!check_Start_Order_Processing || check_Start_Order_Processing.type !== 'START_ORDER_PROCESSING')
      throw 'START_ORDER_PROCESSING IS NOT EXIST'
    let Handle_Payment = await this._process.createProcess('HANDLE_PAYMENT')
    return Handle_Payment
  }
  get_Handle_Payment() {
    return this._process.getProcessByType('HANDLE_PAYMENT')
  }
  // --------------------Do_not_Capture_Online---------------------------
  async Do_not_Capture_Online(address_Handle_Payment) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_Handle_Payment = this._process.getProcessByAddress(address_Handle_Payment)
    if (!check_Handle_Payment || check_Handle_Payment.type !== 'HANDLE_PAYMENT')
      throw 'HANDLE_PAYMENT IS NOT EXIST'
    let Do_not_Capture_Online = await this._process.createProcess('DO_NOT_CAPTURE_ONLINE')
    return Do_not_Capture_Online
  }
  get_Do_not_Capture_Online() {
    return this._process.getProcessByType('DO_NOT_CAPTURE_ONLINE')
  }
  // --------------------Receive_Money_offline---------------------------
  check_Receive_Money_offline(address) {
    let check_Receive_Money_offline = this.getReceive_Money_offlineByAddress(address)
    if (!check_Receive_Money_offline || check_Receive_Money_offline.type !== 'RECEIVED_MONEY_OFFLINE') throw `RECEIVED_MONEY_OFFLINE IS NOT EXIST`
    return true
  }
  getReceive_Money_offlineByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Receive_Money_offline(address_Do_not_Capture_Online) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_Do_not_Capture_Online = this._process.getProcessByAddress(address_Do_not_Capture_Online)
    if (!check_Do_not_Capture_Online || check_Do_not_Capture_Online.type !== 'DO_NOT_CAPTURE_ONLINE')
      throw 'DO_NOT_CAPTURE_ONLINE IS NOT EXIST'
    let Receive_Money_offline = await this._process.createProcess('RECEIVED_MONEY_OFFLINE')
    return Receive_Money_offline
  }
  get_Receive_Money_offline() {
    return this._process.getProcessByType('RECEIVED_MONEY_OFFLINE')
  }
  // --------------------Capture_Online---------------------------
  check_Capture_Online(address) {
    let check_Capture_Online = this.getCapture_OnlineByAddress(address)
    if (!check_Capture_Online || check_Capture_Online.type !== 'CAPTURE_ONLINE') throw `CAPTURE_ONLINE IS NOT EXIST`
    return true
  }
  getCapture_OnlineByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Capture_Online(address_Handle_Payment) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_Handle_Payment = this._process.getProcessByAddress(address_Handle_Payment)
    if (!check_Handle_Payment || check_Handle_Payment.type !== 'HANDLE_PAYMENT')
      throw 'HANDLE_PAYMENT IS NOT EXIST'
    let Capture_Online = await this._process.createProcess('CAPTURE_ONLINE')
    return Capture_Online
  }
  get_Capture_Online() {
    return this._process.getProcessByType('CAPTURE_ONLINE')
  }
  // --------------------Create_invoice---------------------------
  checkProcess(address) {
    this.check_Capture_Online = this.getCapture_OnlineByAddress(address);
    this.check_Receive_Money_offline = this.getReceive_Money_offlineByAddress(address);

    if (this.check_Capture_Online.type == 'CAPTURE_ONLINE') {
      return true;
    }
    else if (this.check_Receive_Money_offline.type == 'RECEIVED_MONEY_OFFLINE') {
      return true;
    }
    else {
      throw `CAPTURE_ONLINE_OR_RECEIVED_MONEY_OFFLINE IS NOT EXIST`;
    }
  }
  async check_Create_invoice1() {
    this.checkProcess(this.sender, 'CAPTURE_ONLINE_OR_RECEIVED_MONEY_OFFINE_FOR_CHECK')
    let check = await this._process.createProcess('CAPTURE_ONLINE_OR_RECEIVED_MONEY_OFFINE')
    return check
  }
  get_check_Create_invoice1() {
    return this._process.getProcessByType('CAPTURE_ONLINE_OR_RECEIVED_MONEY_OFFINE')
  }
  check_Create_invoice(address) {
    let check_Create_invoice = this.getCreate_invoiceByAddress(address)
    if (!check_Create_invoice || check_Create_invoice.type !== 'CREATE_INVOICE') throw `CREATE_INVOICE IS NOT EXIST`
    return true
  }
  getCreate_invoiceByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Create_invoice(address_check_Create_invoice) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_check_Create_invoice1 = this._process.getProcessByAddress(address_check_Create_invoice)
    if (!check_check_Create_invoice1 || check_check_Create_invoice1.type !== 'CAPTURE_ONLINE_OR_RECEIVED_MONEY_OFFINE')
      throw 'CAPTURE_ONLINE_OR_RECEIVED_MONEY_OFFINE IS NOT EXIST'
    let Create_invoice = await this._process.createProcess('CREATE_INVOICE')
    return Create_invoice
  }
  get_Create_invoice() {
    return this._process.getProcessByType('CREATE_INVOICE')
  }
  // --------------------Handle_Shipment---------------------------
  async Handle_Shipment(address_Start_Order_Processing) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_Start_Order_Processing = this._process.getProcessByAddress(address_Start_Order_Processing)
    if (!check_Start_Order_Processing || check_Start_Order_Processing.type !== 'START_ORDER_PROCESSING')
      throw 'START_ORDER_PROCESSING IS NOT EXIST'
    let Handle_Shipment = await this._process.createProcess('HANDLE_SHIPMENT')
    return Handle_Shipment
  }
  get_Handle_Shipment() {
    return this._process.getProcessByType('HANDLE_SHIPMENT')
  }
  // --------------------Ship_Product_to_get_Tracking_Number---------------------------
  async Ship_Product_to_get_Tracking_Number(address_Handle_Shipment) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_Handle_Shipment = this._process.getProcessByAddress(address_Handle_Shipment)
    if (!check_Handle_Shipment || check_Handle_Shipment.type !== 'HANDLE_SHIPMENT')
      throw 'HANDLE_SHIPMENT IS NOT EXIST'
    let Ship_Product_to_get_Tracking_Number = await this._process.createProcess('SHIP_PRODUCT_TO_GET_TRACKING_NUMBER')
    return Ship_Product_to_get_Tracking_Number
  }
  get_Ship_Product_to_get_Tracking_Number() {
    return this._process.getProcessByType('SHIP_PRODUCT_TO_GET_TRACKING_NUMBER')
  }
  // --------------------Create_Shipment_with_Tracking_Number---------------------------
  check_Create_Shipment_with_Tracking_Number(address) {
    let check_Create_Shipment_with_Tracking_Number = this.getCreate_Shipment_with_Tracking_NumberByAddress(address)
    if (!check_Create_Shipment_with_Tracking_Number || check_Create_Shipment_with_Tracking_Number.type !== 'CREATE_PRODUCT_WITH_TRACKING_NUMBER') throw `CREATE_PRODUCT_WITH_TRACKING_NUMBER IS NOT EXIST`
    return true
  }
  getCreate_Shipment_with_Tracking_NumberByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Create_Shipment_with_Tracking_Number(address_check_Ship_Product_to_get_Tracking_Number) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_Ship_Product_to_get_Tracking_Number = this._process.getProcessByAddress(address_check_Ship_Product_to_get_Tracking_Number)
    if (!check_Ship_Product_to_get_Tracking_Number || check_Ship_Product_to_get_Tracking_Number.type !== 'SHIP_PRODUCT_TO_GET_TRACKING_NUMBER')
      throw 'SHIP_PRODUCT_TO_GET_TRACKING_NUMBER IS NOT EXIST'
    let Create_Shipment_with_Tracking_Number = await this._process.createProcess('CREATE_PRODUCT_WITH_TRACKING_NUMBER')
    return Create_Shipment_with_Tracking_Number
  }
  get_Create_Shipment_with_Tracking_Number() {
    return this._process.getProcessByType('CREATE_PRODUCT_WITH_TRACKING_NUMBER')
  }
  // --------------------Order_Complete---------------------------
  checkProcess1(address) {
    this.check_Create_Shipment_with_Tracking_Number = this.getCreate_Shipment_with_Tracking_NumberByAddress(address);
    this.check_Create_invoice = this.getCreate_invoiceByAddress(address);
    if (this.check_Create_Shipment_with_Tracking_Number.type == 'CREATE_PRODUCT_WITH_TRACKING_NUMBER') {
      return true;
    }
    else if (this.check_Create_invoice.type == 'CREATE_INVOICE') {
      return true;
    }
    else {
      throw `CREATE_PRODUCT_WITH_TRACKING_NUMBER_OR_CREATE_INVOICE_FOR_CHECK IS NOT EXIST`;
    }
  }
  async Check_Order_Complete() {
    this.checkProcess1(this.sender, 'CREATE_PRODUCT_WITH_TRACKING_NUMBER_OR_CREATE_INVOICE_FOR_CHECK')
    let check1 = await this._process.createProcess('CREATE_PRODUCT_WITH_TRACKING_NUMBER_OR_CREATE_INVOICE')
    return check1
  }
  get_Check_Order_Complete() {
    return this._process.getProcessByType('CREATE_PRODUCT_WITH_TRACKING_NUMBER_OR_CREATE_INVOICE')
  }
  async Order_Complete(address_check_Order_Complete) {
    this._system.checkSystem(this.sender, 'SYSTEM')
    let check_check_Order_Complete = this._process.getProcessByAddress(address_check_Order_Complete)
    if (!check_check_Order_Complete || check_check_Order_Complete.type !== 'CREATE_PRODUCT_WITH_TRACKING_NUMBER_OR_CREATE_INVOICE')
      throw 'CREATE_PRODUCT_WITH_TRACKING_NUMBER_OR_CREATE_INVOICE IS NOT EXIST'
    let Order_Complete = await this._process.createProcess('ORDER_COMPLETE')
    this.setToAddress(Order_Complete.address)
    return { Order_Complete }
  }
}
export default TokenMain;
