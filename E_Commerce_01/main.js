import Contract from 'Contract'
import User from './user'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Customer',
    'get_View_Products',
    'get_Add_to_cart',
    'get_Do_not_use_google_checkout',
    'get_Process_checkout_billing_shipping_payment',
    'get_Do_not_need_3rd_Party_Auth',
    'get_Need_3rd_Party_Auth',
    'get_Use_3rd_party_Payment_Mathod',
    'get_Use_google_checkout',
    'get_Pay_and_Place_order_Using_google_checkout',
    'get_check_Place_Order',
    'get_Place_Order'
  ]
  static authenticationFuncs = [
    'View_Products',
    'Add_to_cart',
    'Do_not_use_google_checkout',
    'Process_checkout_billing_shipping_payment',
    'Pay_Order',
    'Do_not_need_3rd_Party_Auth',
    'Need_3rd_Party_Auth',
    'Use_3rd_party_Payment_Mathod',
    'Use_google_checkout',
    'Pay_and_Place_order_Using_google_checkout',
    'check_Place_Order',
    'Place_Order'
  ]
  static publicFuncs = [
    'Customer',
    'get_Customer',
    'View_Products',
    'get_View_Products',
    'Add_to_cart',
    'get_Add_to_cart',
    'Do_not_use_google_checkout',
    'get_Do_not_use_google_checkout',
    'Process_checkout_billing_shipping_payment',
    'get_Process_checkout_billing_shipping_payment',
    'Do_not_need_3rd_Party_Auth',
    'get_Do_not_need_3rd_Party_Auth',
    'Need_3rd_Party_Auth',
    'get_Need_3rd_Party_Auth',
    'Use_3rd_party_Payment_Mathod',
    'get_Use_3rd_party_Payment_Mathod',
    'Use_google_checkout',
    'get_Use_google_checkout',
    'Pay_and_Place_order_Using_google_checkout',
    'get_Pay_and_Place_order_Using_google_checkout',
    'check_Place_Order',
    'get_check_Place_Order',
    'Place_Order',
    'get_Place_Order'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'E-COMMERCE-01'
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
    this._process = new Process(data)
  }
  //---------------------user------------------------------
  async Customer() {
    let Customer = await this._user.createUser('CUSTOMER')
    return Customer
  }
  get_Customer() {
    let Customer = this._user.getUserByType('CUSTOMER')
    return Customer
  }
  // --------------------View_Products---------------------------
  checkProcess2(address) {
    this._user.checkUser = this._user.getUserByAddress(address);
    this.check_Add_to_cart = this.getAdd_to_cartByAddress(address);
    if (this._user.checkUser.type == 'CUSTOMER') {
      return true;
    }
    else if (this.check_Add_to_cart.type == 'ADD_TO_CART') {
      return true;
    }
    else {
      throw `ADD_TO_CART_OR_CUSTOMER IS NOT EXIST`;
    }
  }
  async View_Products() {
    await this.checkProcess2(this.sender, 'ADD_TO_CART_OR_CUSTOMER')
    let View_Products = await this._process.createProcess('VIEW_PRODUCTS')
    return View_Products
  }
  get_View_products() {
    return this._process.getProcessByType('VIEW_PRODUCTS')
  }
  // --------------------Add_to_cart---------------------------
  check_Add_to_cart(address) {
    let check_Add_to_cart = this.getAdd_to_cartByAddress(address)
    if (!check_Add_to_cart || check_Add_to_cart.type !== 'ADD_TO_CART') throw `ADD_TO_CART IS NOT EXIST`
    return true
  }
  getAdd_to_cartByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Add_to_cart(address_View_products) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_View_products = this._process.getProcessByAddress(address_View_products)
    if (!check_View_products || check_View_products.type !== 'VIEW_PRODUCTS')
      throw 'VIEW_PRODUCTS IS NOT EXIST'
    let Add_to_cart = await this._process.createProcess('ADD_TO_CART')
    return Add_to_cart
  }
  get_Add_to_cart() {
    return this._process.getProcessByType('ADD_TO_CART')
  }
  // --------------------Use_google_checkout---------------------------
  async Use_google_checkout(address_Add_to_cart) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Add_to_cart = this._process.getProcessByAddress(address_Add_to_cart)
    if (!check_Add_to_cart || check_Add_to_cart.type !== 'ADD_TO_CART')
      throw 'ADD_TO_CART IS NOT EXIST'
    let use = await this._process.createProcess('USE_GOOGLE_CHECKOUT')
    return use
  }
  get_Use_google_checkout() {
    return this._process.getProcessByType('USE_GOOGLE_CHECKOUT')
  }
  // --------------------Pay_and_Place_order_Using_google_checkout---------------------------
  async Pay_and_Place_order_Using_google_checkout(address_Use_google_checkout) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Use_google_checkout = this._process.getProcessByAddress(address_Use_google_checkout)
    if (!check_Use_google_checkout || check_Use_google_checkout.type !== 'USE_GOOGLE_CHECKOUT')
      throw 'USE_GOOGLE_CHECKOUT IS NOT EXIST'
    let Pay_and_Place = await this._process.createProcess('PAY_AND_PLACE_ORDER_USING_GOOGLE_CHECKOUT')
    return Pay_and_Place
  }
  get_Pay_and_Place_order_Using_google_checkout() {
    return this._process.getProcessByType('PAY_AND_PLACE_ORDER_USING_GOOGLE_CHECKOUT')
  }
  // --------------------Do_not_use_google_checkout---------------------------
  async Do_not_use_google_checkout(address_Add_to_cart) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Add_to_cart = this._process.getProcessByAddress(address_Add_to_cart)
    if (!check_Add_to_cart || check_Add_to_cart.type !== 'ADD_TO_CART')
      throw 'ADD_TO_CART IS NOT EXIST'
    let usenot = await this._process.createProcess('DO_NOT_USE_GOOGLE_CHECKOUT')
    return usenot
  }
  get_Do_not_use_google_checkout() {
    return this._process.getProcessByType('DO_NOT_USE_GOOGLE_CHECKOUT')
  }
  // --------------------Process_checkout_billing_shipping_payment---------------------------
  check_Process_checkout_billing_shipping_payment(address) {
    let check_Process_checkout_billing_shipping_payment = this.getProcess_checkout_billing_shipping_paymentByAddress(address)
    if (!check_Process_checkout_billing_shipping_payment || check_Process_checkout_billing_shipping_payment.type !== 'PROCESS_CHECKOUT_BILLING_SHIPPING_PAYMENT') throw `PROCESS_CHECKOUT_BILLING_SHIPPING_PAYMENT IS NOT EXIST`
    return true
  }
  getProcess_checkout_billing_shipping_paymentByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Process_checkout_billing_shipping_payment(address_Do_not_use_google_checkout) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Do_not_use_google_checkout = this._process.getProcessByAddress(address_Do_not_use_google_checkout)
    if (!check_Do_not_use_google_checkout || check_Do_not_use_google_checkout.type !== 'DO_NOT_USE_GOOGLE_CHECKOUT')
      throw 'DO_NOT_USE_GOOGLE_CHECKOUT IS NOT EXIST'
    let Process_checkout = await this._process.createProcess('PROCESS_CHECKOUT_BILLING_SHIPPING_PAYMENT')
    return Process_checkout
  }
  get_Process_checkout_billing_shipping_payment() {
    return this._process.getProcessByType('PROCESS_CHECKOUT_BILLING_SHIPPING_PAYMENT')
  }
  // --------------------Place_Order---------------------------
  checkProcess(address) {
    this.check_Do_not_need_3rd_Party_Auth = this.getDo_not_need_3rd_Party_AuthByAddress(address);
    this.check_Process_checkout_billing_shipping_payment = this.getProcess_checkout_billing_shipping_paymentByAddress(address);
    this.check_Use_3rd_party_Payment_Mathod = this.getUse_3rd_party_Payment_MathodByAddress(address);
    if (this.check_Do_not_need_3rd_Party_Auth.type == 'DO_NOT_NEED_3RD_PARTY_AUTH') {
      return true;
    }
    else if (this.check_Process_checkout_billing_shipping_payment.type == 'PROCESS_CHECKOUT_BILLING_SHIPPING_PAYMENT') {
      return true;
    }
    else if (this.check_Use_3rd_party_Payment_Mathod.type == 'USE_3RD_PARTY_PAYMENT_MATHOD') {
      return true;
    }
    else {
      throw `DO_NOT_NEED_3RD_PARTY_AUTH_OR_PROCESS_CHECKOUT_BILLING_SHIPPING_PAYMENT_OR_USE_3RD_PARTY_PAYMENT_MATHOD_FOR_CHECK IS NOT EXIST`;
    }
  }
  async check_Place_Order() {
    this.checkProcess(this.sender, 'DO_NOT_NEED_3RD_PARTY_AUTH_OR_PROCESS_CHECKOUT_BILLING_SHIPPING_PAYMENT_USE_3RD_PARTY_PAYMENT_MATHOD_FOR_CHECK')
    let check = await this._process.createProcess('DO_NOT_NEED_3RD_PARTY_AUTH_OR_PROCESS_CHECKOUT_BILLING_SHIPPING_PAYMENT_OR_USE_3RD_PARTY_PAYMENT_MATHOD_FOR_CHECK')
    return check
  }
  get_check_Place_Order() {
    return this._process.getProcessByType('DO_NOT_NEED_3RD_PARTY_AUTH_OR_PROCESS_CHECKOUT_BILLING_SHIPPING_PAYMENT')
  }
  async Place_Order(address_check_Place_Order) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_check_Place_Order = this._process.getProcessByAddress(address_check_Place_Order)
    if (!check_check_Place_Order || check_check_Place_Order.type !== 'DO_NOT_NEED_3RD_PARTY_AUTH_OR_PROCESS_CHECKOUT_BILLING_SHIPPING_PAYMENT_OR_USE_3RD_PARTY_PAYMENT_MATHOD_FOR_CHECK')
      throw 'DO_NOT_NEED_3RD_PARTY_AUTH_OR_PROCESS_CHECKOUT_BILLING_SHIPPING_PAYMENT IS NOT EXIST'
    let Place_Order = await this._process.createProcess('PLACE_ORDER')
    return Place_Order
  }
  get_Place_Order() {
    return this._process.getProcessByType('PLACE_ORDER')
  }
  // --------------------Do_not_need_3rd_Party_Auth---------------------------
  check_Do_not_need_3rd_Party_Auth(address) {
    let check_Do_not_need_3rd_Party_Auth = this.getDo_not_need_3rd_Party_AuthByAddress(address)
    if (!check_Do_not_need_3rd_Party_Auth || check_Do_not_need_3rd_Party_Auth.type !== 'DO_NOT_NEED_3RD_PARTY_AUTH') throw `DO_NOT_NEED_3RD_PARTY_AUTH IS NOT EXIST`
    return true
  }
  getDo_not_need_3rd_Party_AuthByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Do_not_need_3rd_Party_Auth(address_Place_Order) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Place_Order = this._process.getProcessByAddress(address_Place_Order)
    if (!check_Place_Order || check_Place_Order.type !== 'PLACE_ORDER')
      throw 'PLACE_ORDER IS NOT EXIST'
    let Do_not_need_3rd_Party_Auth = await this._process.createProcess('DO_NOT_NEED_3RD_PARTY_AUTH')
    return Do_not_need_3rd_Party_Auth
  }
  get_Do_not_need_3rd_Party_Auth() {
    return this._process.getProcessByType('DO_NOT_NEED_3RD_PARTY_AUTH')
  }
  // --------------------Need_3rd_Party_Auth---------------------------
  async Need_3rd_Party_Auth(address_Place_Order) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Place_Order = this._process.getProcessByAddress(address_Place_Order)
    if (!check_Place_Order || check_Place_Order.type !== 'PLACE_ORDER')
      throw 'PLACE_ORDER IS NOT EXIST'
    let Need_3rd_Party_Auth = await this._process.createProcess('NEED_3RD_PARTY_AUTH')
    return Need_3rd_Party_Auth
  }
  get_Need_3rd_Party_Auth() {
    return this._process.getProcessByType('NEED_3RD_PARTY_AUTH')
  }
  // --------------------Use_3rd_party_Payment_Mathod---------------------------
  check_Use_3rd_party_Payment_Mathod(address) {
    let check_Use_3rd_party_Payment_Mathod = this.getUse_3rd_party_Payment_MathodByAddress(address)
    if (!check_Use_3rd_party_Payment_Mathod || check_Use_3rd_party_Payment_Mathod.type !== 'USE_3RD_PARTY_PAYMENT_MATHOD') throw `USE_3RD_PARTY_PAYMENT_MATHOD IS NOT EXIST`
    return true
  }
  getUse_3rd_party_Payment_MathodByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Use_3rd_party_Payment_Mathod(address_Need_3rd_Party_Auth) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Need_3rd_Party_Auth = this._process.getProcessByAddress(address_Need_3rd_Party_Auth)
    if (!check_Need_3rd_Party_Auth || check_Need_3rd_Party_Auth.type !== 'NEED_3RD_PARTY_AUTH')
      throw 'NEED_3RD_PARTY_AUTH IS NOT EXIST'
    let Use_3rd_party_Payment_Mathod = await this._process.createProcess('USE_3RD_PARTY_PAYMENT_MATHOD')
    return Use_3rd_party_Payment_Mathod
  }
  get_Use_3rd_party_Payment_Mathod() {
    return this._process.getProcessByType('USE_3RD_PARTY_PAYMENT_MATHOD')
  }
}
export default TokenMain;
