import Contract from 'Contract'
import User from './user'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_API',
    'get_Login',
    'get_Generate_Token',
    'get_Import_Data',
    'get_Item',
    'get_Generate_QR_code',
    'get_Database',
    'get_Generate_Address',
    'get_Scan_QR_Code',
    'get_Manufacture',
    'get_BBD_Server',
    'get_BBD_Storage',
    'get_CSE30',
    'get_Customer',
  ]
  static authenticationFuncs = [
    'API',
    'Login',
    'Generate_Token',
    'Import_Data',
    'Item',
    'Generate_QR_code',
    'Database',
    'Generate_Address',
    'Scan_QR_Code',
    'check_Database',
    'check_Import_Data',
    'Scan_QR_Code_or_Database'
  ]
  static publicFuncs = [
    'Manufacture',
    'get_Manudacture',
    'BBD_Server',
    'get_BBD_Server',
    'BBD_Storage',
    'get_BBD_Storage',
    'CSE30',
    'get_CSE30',
    'Customer',
    'get_Customer',
    'API',
    'get_API',
    'Login',
    'get_Login',
    'Generate_Token',
    'get_Generate_Token',
    'check_Import_Data',
    'Import_Data',
    'get_Import_Data',
    'Generate_Address',
    'get_Generate_Address',
    'Scan_QR_Code_or_Database',
    'Item',
    'get_Item',
    'Scan_QR_Code',
    'get_Generate_QR_code',
    'check_Database',
    'Database',
    'get_Database',
    'Generate_Address',
    'get_Generate_Address',
    'Generate_QR_code',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'BBD_FLOW'
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
  //---------------------USER------------------------------
  async Manufacture() {
    let Manufacture = await this._user.createUser('MANUFACTURE')
    return Manufacture
  }
  get_Manudacture() {
    let Manufacture = this._user.getUserByType('MANUFACTURE')
    return Manufacture
  }
  async BBD_Server() {
    let BBD_Server = await this._user.createUser('BBD_SERVER')
    return BBD_Server
  }
  get_BBD_Server() {
    let BBD_Server = this._user.getUserByType('BBD_SERVER')
    return BBD_Server
  }
  async BBD_Storage() {
    let BBD_Storage = await this._user.createUser('BBD_STORAGE')
    return BBD_Storage
  }
  get_BBD_Storage() {
    let BBD_Storage = this._user.getUserByType('BBD_STORAGE')
    return BBD_Storage
  }

  async CSE30() {
    let CSE30 = await this._user.createUser('CSE30')
    return CSE30
  }
  get_CSE30() {
    let CSE30 = this._user.getUserByType('CSE30')
    return CSE30
  }
  async Customer() {
    let Customer = await this._user.createUser('CUSTOMER')
    return Customer
  }
  get_Customer() {
    let Customer = this._user.getUserByType('CUSTOMER')
    return Customer
  }



  // --------------------API---------------------------


  async API() {
    await this._user.checkUser(this.sender, 'MANUFACTURE')
    let ipa = await this._process.createProcess('API')
    return ipa
  }
  get_API() {
    return this._process.getProcessByType('API')
  }
  // --------------------Login---------------------------
  check_Login(address) {
    let check_Login = this.get_LoginByAddress(address)
    if (!check_Login || check_Login.type !== 'LOGIN') throw `LOGIN IS NOT EXIST`
    return true
  }
  get_LoginByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }

  async Login() {
    await this._user.checkUser(this.sender, 'MANUFACTURE')
    let login = await this._process.createProcess('LOGIN')
    return login
  }
  get_Login() {
    return this._process.getProcessByType('LOGIN')
  }

  // --------------------Generate_Token---------------------------

  check_Generate_Token(address) {
    let check_Generate_Token = this.get_Generate_TokenByAddress(address)
    if (!check_Generate_Token || check_Generate_Token.type !== 'GENERATE_TOKEN') throw `GENERATE_TOKEN IS NOT EXIST`
    return true
  }
  get_Generate_TokenByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Generate_Token(address_API) {
    this._user.checkUser(this.sender, 'MANUFACTURE')
    let check_API = this._process.getProcessByAddress(address_API)
    if (!check_API || check_API.type !== 'API')
      throw 'API IS NOT EXIST'
    let Generate_token = await this._process.createProcess('GENERATE_TOKEN')
    return Generate_token

  }

  get_Generate_Token() {
    return this._process.getProcessByType('GENERATE_TOKEN')
  }


  // --------------------Import_Data---------------------------

  checkImport_Data1(address) {
    this.check_Generate_Token = this.get_Generate_TokenByAddress(address);
    this.check_Login = this.get_LoginByAddress(address);
    this.check_Generate_Address = this.get_Generate_AddressByAddress(address);

    if (this.check_Generate_Token.type == 'GENERATE_TOKEN') {
      return true;
    }
    else if (this.check_Login.type == 'LOGIN') {
      return true;
    }
    else if (this.check_Generate_Address.type == 'GENERATE_ADDRESS') {
      return true;
    }
    else {
      throw `GENERATE_TOKEN_OR_LOGIN_GENERATE_ADDRESS_FOR_CHECK IS NOT EXIST`;

    }

  }
  async check_Import_Data() {
    this.checkImport_Data1(this.sender, 'GENERATE_TOKEN_OR_LOGIN_GENERATE_ADDRESS_FOR_CHECK')
    let import_data = await this._process.createProcess('GENERATE_TOKEN_OR_LOGIN')
    return import_data

  }
  check_Import_Data2(address) {
    let check_Import_Data2 = this.get_Import_Data2ByAddress(address)
    if (!check_Import_Data2 || check_Import_Data2.type !== 'IMPORT_DATA') throw `IMPORT_DATA IS NOT EXIST`
    return true
  }
  get_Import_Data2ByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Import_Data(address_check_Import_Data) {
    this._user.checkUser(this.sender, 'BBD_SERVER')
    let check_Import_Data = this._process.getProcessByAddress(address_check_Import_Data)
    if (!check_Import_Data || check_Import_Data.type !== 'GENERATE_TOKEN_OR_LOGIN')
      throw 'GENERATE_TOKEN_OR_LOGIN IS NOT EXIST'
    let imdata = await this._process.createProcess('IMPORT_DATA')
    return imdata

  }

  get_Import_Data() {
    return this._process.getProcessByType('IMPORT_DATA')
  }

  // --------------------Generate_Address---------------------------
  check_Generate_Address(address) {
    let check_Generate_Address = this.get_Generate_AddressByAddress(address)
    if (!check_Generate_Address || check_Generate_Address.type !== 'GENERATE_ADDRESS') throw `GENERATE_ADDRESS IS NOT EXIST`
    return true
  }
  get_Generate_AddressByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Generate_Address(address_Import_Data) {
    this._user.checkUser(this.sender, 'CSE30')
    let check_Import_Data = this._process.getProcessByAddress(address_Import_Data)
    if (!check_Import_Data || check_Import_Data.type !== 'IMPORT_DATA')
      throw 'IMPORT_DATA IS NOT EXIST'
    let Blockchain_Token_for_Finished_Good = await this._process.createProcess('GENERATE_ADDRESS')
    return Blockchain_Token_for_Finished_Good

  }

  get_Generate_Address() {
    return this._process.getProcessByType('GENERATE_ADDRESS')
  }
  // --------------------Database---------------------------

  checkDatabase_for_check(address) {
    this.check_Import_Data2 = this.get_Import_Data2ByAddress(address);
    this.checkItem = this.getItemByAddress(address);

    if (this.check_Import_Data2.type == 'IMPORT_DATA') {
      return true;
    }
    else if (this.checkItem.type == 'ITEM') {
      return true;
    }
    else {
      throw `IMPORT_DATA_OR_ITEM_FOR_CHECK IS NOT EXIST`;

    }

  }
  async check_Database() {
    this.checkDatabase_for_check(this.sender, 'IMPORT_DATA_OR_ITEM_FOR_CHECK')
    let check = await this._process.createProcess('IMPORT_DATA_OR_ITEM')
    return check
  }
  check_Database1(address) {
    let check_Database1 = this.get_Database1ByAddress(address)
    if (!check_Database1 || check_Database1.type !== 'ImportDatabase') throw `ImportDatabase IS NOT EXIST`
    return true
  }
  get_Database1ByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }


  async Database(address_check_Database) {
    this._user.checkUser(this.sender, 'BBD_STORAGE')
    let check_Database = this._process.getProcessByAddress(address_check_Database)
    if (!check_Database || check_Database.type !== 'IMPORT_DATA_OR_ITEM')
      throw 'IMPORT_DATA_OR_ITEM IS NOT EXIST'
    let imdata = await this._process.createProcess('IMPORT_DATA')
    return imdata

  }

  get_Import_Data() {
    return this._process.getProcessByType('IMPORT_DATA')
  }
  // --------------------Item---------------------------
  checkItem(address) {
    let check_Item = this.get_ItemByAddress(address)
    if (!check_Item || check_Item.type !== 'ITEM') throw `ITEM IS NOT EXIST`
    return true
  }
  getItemByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }

  checkItem1(address) {
    this.check_Scan_QR_Code = this.getScan_QR_CodeByAddress(address);
    this.check_Database1 = this.get_Database1ByAddress(address);

    if (this.check_Scan_QR_Code.type == 'SCAN_QR_CODE') {
      return true;
    }
    else if (this.check_Database1.type == 'DATABASE') {
      return true;
    }
    else {
      throw `SCAN_QR_CODE_OR_DATABASE_FOR_CHECK IS NOT EXIST`;

    }

  }
  async Scan_QR_Code_or_Database() {
    this.checkItem1(this.sender, 'SCAN_QR_CODE_OR_DATABASE_FOR_CHECK')
    let check2 = await this._process.createProcess('SCAN_QR_CODE_OR_DATABASE')
    return check2
  }
  async Item(address_Scan_QR_Code_or_Database) {
    this._user.checkUser(this.sender, 'BBD_SERVER')
    let Check_Item = this._process.getProcessByAddress(address_Scan_QR_Code_or_Database)
    if (!Check_Item || Check_Item.type !== 'SCAN_QR_CODE_OR_DATABASE')
      throw 'SCAN_QR_CODE_OR_DATABASE IS NOT EXIST'
    let item = await this._process.createProcess('ITEM')
    return item

  }

  get_Item() {
    return this._process.getProcessByType('GENERATE_ADDRESS')
  }
  // --------------------Scan_QR_Code---------------------------
  check_Scan_QR_Code(address) {
    let check_Scan_QR_Code = this.getScan_QR_CodeByAddress(address)
    if (!check_Scan_QR_Code || check_Scan_QR_Code.type !== 'SCAN_QR_CODE') throw `SCAN_QR_CODE IS NOT EXIST`
    return true
  }
  getScan_QR_CodeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }


  async Scan_QR_Code() {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let scan = await this._process.createProcess('SCAN_QR_CODE')
   return scan

  }
  // --------------------Generate_QR_code---------------------------

  async Generate_QR_code(address_Item) {
    this._user.checkUser(this.sender, 'MANUFACTURE')
    let check_Item = this._process.getProcessByAddress(address_Item)
    if (!check_Item || check_Item.type !== 'ITEM')
      throw 'ITEM IS NOT EXIST'
    let qr = await this._process.createProcess('GENERATE_QR_CODE')
    this.setToAddress(qr.address)
    return 'SUCCESS'

  }


}
export default TokenMain;
