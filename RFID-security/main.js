import Contract from 'Contract'
import Process from './process'
import QS from './qs'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Initializing_RFID_VM',
    'get_Initializing_GSM_Module',
    'get_RFID_UID_Input',
    'getYes',
    'getNo',
    'get_Four_Digit_Password_Input',
    'getYes',
    'getNo',
    'get_RFID_VM_Access_Granted',
    'get_Vending_Item_Selection',
    'get_Successful_Vend_Balance_Transaction_form_RFID_Card',
    'get_LCD_displays_Balance_after_Transaction',
    'get_Send_an_SMS_to_consumer_about_Balance_after_Transaction_using_GSM',
    'get_GSM_send_an_SMS_to_VM_s_owner_when_3_items_are_left_in_machine',
  ]

  static authenticationFuncs = [
    'RFID_UID_Input',
    'Is_this_UID_stored_in_Database',
    'Initializing_GSM_Module',
    'Four_Digit_Password_Input',
    'Is_password_Valid',
    'RFID_VM_Access_Granted',
    'Vending_Item_Selection',
    'Successful_Vend_Balance_Transaction_form_RFID_Card',
    'LCD_displays_Balance_after_Transaction',
    'Send_an_SMS_to_consumer_about_Balance_after_Transaction_using_GSM',
    'GSM_send_an_SMS_to_VM_s_owner_when_3_items_are_left_in_machine',
  ]
  static publicFuncs = [
    'Initializing_RFID_VM',
    'get_Initializing_RFID_VM',
    'Initializing_GSM_Module',
    'get_Initializing_GSM_Module',
    'RFID_UID_Input',
    'get-RFID_UID_Input',
    'Is_this_UID_stored_in_Database',
    'getYes',
    'getNo',
    'Four_Digit_Password_Input',
    'get_Four_Digit_Password_Input',
    'Is_password_Valid',
    'getYes',
    'getNo',
    'RFID_VM_Access_Granted',
    'get_RFID_VM_Access_Granted',
    'Vending_Item_Selection',
    'get_Vending_Item_Selection',
    'Successful_Vend_Balance_Transaction_form_RFID_Card',
    'get_Successful_Vend_Balance_Transaction_form_RFID_Card',
    'LCD_displays_Balance_after_Transaction',
    'get_LCD_displays_Balance_after_Transaction',
    'Send_an_SMS_to_consumer_about_Balance_after_Transaction_using_GSM',
    'get_Send_an_SMS_to_consumer_about_Balance_after_Transaction_using_GSM',
    'GSM_send_an_SMS_to_VM_s_owner_when_3_items_are_left_in_machine',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'RFID SECURITY'
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
    this._process = new Process(data)

    this._qs = new QS(data)
  }
  //---------------------Initializing_RFID_VM------------------------------
  async Initializing_RFID_VM() {
    let Initializing = await this._process.createProcess('INITIALIZING_RFID_VM')
    return Initializing

  }
  get_Initializing_RFID_VM() {
    let Initializing = this._process.getProcessByType('INITIALIZING_RFID_VM')
    return Initializing
  }
  //---------------------c------------------------------
  async Initializing_GSM_Module() {
    let CheckInitializing_RFID_VM = this._process.getProcessByAddress(this.sender)
    if (!CheckInitializing_RFID_VM || CheckInitializing_RFID_VM.type !== 'INITIALIZING_RFID_VM') throw 'INITIALIZING_RFID_VM IS NOT EXIST'
    let Initializing_GSM_Module = await this._process.createProcess('INITIALIZING_GSM_MODULE')
    return Initializing_GSM_Module
  }
  get_Initializing_GSM_Module() {
    return this._process.getProcessByType('INITIALIZING_GSM_MODULE')
  }
  //---------------------RFID_UID_Input------------------------------
  async RFID_UID_Input() {
    let CheckInitializing_GSM_Module = this._process.getProcessByAddress(this.sender)
    if (!CheckInitializing_GSM_Module || CheckInitializing_GSM_Module.type !== 'INITIALIZING_GSM_MODULE') throw 'INITIALIZING_GSM_MODULE IS NOT EXIST'
    let RFID_UID_Input = await this._process.createProcess('RFID_UID_INPUT')
    return RFID_UID_Input
  }
  getRFID_UID_Input() {
    return this._process.getProcessByType('RFID_UID_INPUT')
  }
  //---------------------Is_this_UID_stored_in_Database------------------------------
  async Is_this_UID_stored_in_Database(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2].includes(Number(type))) throw 'CREATE QS FAIL'
    await this._process.checkProcess(this.sender)
    let qs = await this._qs.createQS(type - 1, this.sender)
    this.setToAddress(qs.address)
    return qs
  }
  async getYes() {
    await this._process.checkPocess(this.sender)
    return this._qs.getQSByType('YES', this.sender)
  }
  async getNO() {
    await this._process.checkPocess(this.sender)
    return this._qs.getQSByType('NO', this.sender)
  }
  //---------------------Four_Digit_Password_Input------------------------------
  async Four_Digit_Password_Input() {
    let CheckgetYes = this._process.getProcessByAddress(this.sender)
    if (!CheckgetYes || CheckgetYes.type !== 'YES') throw 'YES IS NOT EXIST'
    let Digit = await this._process.createProcess('FOUR_DIGIT_PASWORD_INPUT')
    return Digit
  }
  get_Four_Digit_Password_Input() {
    return this._process.getProcessByType('FOUR_DIGIT_PASWORD_INPUT')
  }
  //---------------------Is_password_Valid------------------------------
  async Is_password_Valid(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2].includes(Number(type))) throw 'CREATE QS FAIL'
    await this._process.checkPocess(this.sender)
    let qs = await this._qs.createQS(type - 1, this.sender)
    this.setToAddress(qs.address)
    return qs
  }
  async getYes() {
    await this._process.checkPocess(this.sender)
    return this._qs.getQSByType('YES', this.sender)
  }
  async getNO() {
    await this._process.checkPocess(this.sender)
    return this._qs.getQSByType('NO', this.sender)
  }
  //---------------------RFID_VM_Access_Granted------------------------------
  async RFID_VM_Access_Granted() {
    let CheckgetYes = this._process.getProcessByAddress(this.sender)
    if (!CheckgetYes || CheckgetYes.type !== 'YES') throw 'YES IS NOT EXIST'
    let access = await this._process.createProcess('RFID_VM_ACCESS_GRANTED')
    return access
  }
  get_RFID_VM_Access_Granted() {
    return this._process.getProcessByType('RFID_VM_ACCESS_GRANTED')
  }
  //---------------------Vending_Item_Selection------------------------------
  async Vending_Item_Selection() {
    let CheckRFID_VM_Access_Granted = this._process.getProcessByAddress(this.sender)
    if (!CheckRFID_VM_Access_Granted || CheckRFID_VM_Access_Granted.type !== 'RFID_VM_ACCESS_GRANTED') throw 'RFID_VM_ACCESS_GRANTED IS NOT EXIST'
    let vending = await this._process.createProcess('VENDING_ITEM_SELECTION')
    return vending
  }
  get_Vending_Item_Selection() {
    return this._process.getProcessByType('VENDING_ITEM_SELECTION')
  }
  //---------------------Successful_Vend_Balance_Transaction_form_RFID_Card------------------------------
  async Successful_Vend_Balance_Transaction_form_RFID_Card() {
    let CheckVending_Item_Selection = this._process.getProcessByAddress(this.sender)
    if (!CheckVending_Item_Selection || CheckVending_Item_Selection.type !== 'VENDING_ITEM_SELECTION') throw 'VENDING_ITEM_SELECTION IS NOT EXIST'
    let Balance = await this._process.createProcess('SUCCESSFUL_VEND_BALANCE_TRANSACTION_FROM_RDID_CARD')
    return Balance
  }
  get_Successful_Vend_Balance_Transaction_form_RFID_Card() {
    return this._process.getProcessByType('SUCCESSFUL_VEND_BALANCE_TRANSACTION_FROM_RDID_CARD')
  }
  //---------------------LCD_displays_Balance_after_Transaction------------------------------
  async LCD_displays_Balance_after_Transaction() {
    let CheckSuccessful_Vend_Balance_Transaction = this._process.getProcessByAddress(this.sender)
    if (!CheckSuccessful_Vend_Balance_Transaction || CheckSuccessful_Vend_Balance_Transaction.type !== 'SUCCESSFUL_VEND_BALANCE_TRANSACTION_FROM_RDID_CARD') throw 'SUCCESSFUL_VEND_BALANCE_TRANSACTION_FROM_RDID_CARD IS NOT EXIST'
    let Balance = await this._process.createProcess('LCD_DISPLAYS_BALANCE_AFTER_TRANSACTION')
    return Balance
  }
  get_LCD_displays_Balance_after_Transaction() {
    return this._process.getProcessByType('LCD_DISPLAYS_BALANCE_AFTER_TRANSACTION')
  }
  //---------------------Send_an_SMS_to_consumer_about_Balance_after_Transaction_using_GSM------------------------------

  async Send_an_SMS_to_consumer_about_Balance_after_Transaction_using_GSM() {
    let CheckLCD_displays = this._process.getProcessByAddress(this.sender)
    if (!CheckLCD_displays || CheckLCD_displays.type !== 'LCD_DISPLAYS_BALANCE_AFTER_TRANSACTION') throw 'LCD_DISPLAYS_BALANCE_AFTER_TRANSACTION IS NOT EXIST'
    let Balance = await this._process.createProcess('SEND_AN_SMS_TO_CONSUMER_ABOUT_BALANCE_AFTER_TRANSACTION_USING_GSM')
    return Balance
  }
  get_Send_an_SMS_to_consumer_about_Balance_after_Transaction_using_GSM() {
    return this._process.getProcessByType('SEND_AN_SMS_TO_CONSUMER_ABOUT_BALANCE_AFTER_TRANSACTION_USING_GSM')
  }
  //---------------------GSM_send_an_SMS_to_VM_s_owner_when_3_items_are_left_in_machine------------------------------
  async GSM_send_an_SMS_to_VM_s_owner_when_3_items_are_left_in_machine() {
    let CheckSend_an_SMS = this._process.getProcessByAddress(this.sender)
    if (!CheckSend_an_SMS || CheckSend_an_SMS.type !== 'SEND_AN_SMS_TO_CONSUMER_ABOUT_BALANCE_AFTER_TRANSACTION_USING_GSM') throw 'SEND_AN_SMS_TO_CONSUMER_ABOUT_BALANCE_AFTER_TRANSACTION_USING_GSM IS NOT EXIST'
    let GSM_send_an_SMS = await this._process.createProcess('GSM_SEND_AN_SMS_TO_VM_S_OWNER_WHEN_3_ITEM_ARE_LEFT_IN_MACHINE')
    this.setToAddress(GSM_send_an_SMS.address)
    return 'SUCCESS'
  }
}
export default TokenMain 
