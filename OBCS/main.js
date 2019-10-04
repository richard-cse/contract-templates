import Contract from 'Contract'
import User from './user'
import Stage from './stage'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Oracle_SCM_cloud',
    'get_Oracle_PaaS_Application',
    'get_Oracle_Blockchain_Cloud_Service',
    'get_Create_PO',
    'get_Manufacturer_Goods',
    'get_Create_Product_Asset',
    'get_Ship_Goods',
    'get_Receive_PO',
    'get_Transfer_Token',
  ]
  static authenticationFuncs = [
    'Receive_PO_or_Smart_Contract',
    'Create_PO',
    'Manufacturer_Goods',
    'Create_Product_Asset',
    'Generate_Unique_Blockchain_Tag',
    'Ship_Goods',
    'Receive_PO',
    'Transfer_Token',
    'OwnershipTranfer',
  ]
  static publicFuncs = [
    'Oracle_SCM_cloud',
    'get_Oracle_SCM_cloud',
    'Oracle_PaaS_Application',
    'get_Oracle_PaaS_Application',
    'Oracle_Blockchain_Cloud_Service',
    'get_Oracle_Blockchain_Cloud_Service',
    'Create_PO',
    'get_Create_PO',
    'Manufacturer_Goods',
    'get_Manufacturer_Goods',
    'Create_Product_Asset',
    'get_Create_Product_Asset',
    'Generate_Unique_Blockchain_Tag',
    'Ship_Goods',
    'get_Ship_Goods',
    'Receive_PO',
    'get_Receive_PO',
    'Transfer_Token',
    'get_Transfer_Token',
    'OwnershipTranfer',

  ]
  static schemas = {
    name: {
      type: String,
      default: 'OBCS'
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
    this._stage = new Stage(data)
  }

  //---------------------USER------------------------------
  async Oracle_SCM_cloud() {
    let Oracle_SCM_cloud = await this._user.createUser('ORACLE_SCM_CLOUD')
    return Oracle_SCM_cloud
  }
  get_Oracle_SCM_cloud() {
    let Oracle_SCM_cloud = this._user.getUserByType('ORACLE_SCM_CLOUD')
    return Oracle_SCM_cloud
  }
  async Oracle_PaaS_Application() {
    let Oracle_PaaS_Application = await this._user.createUser('ORACLE_PAAS_APPLICATION')
    return Oracle_PaaS_Application
  }
  get_Oracle_PaaS_Application() {
    let Oracle_PaaS_Application = this._user.getUserByType('ORACLE_PAAS_APPLICATION')
    return Oracle_PaaS_Application
  }

  async Oracle_Blockchain_Cloud_Service() {
    let Oracle_Blockchain_Cloud_Service = await this._user.createUser('ORACLE_BLOCKCHAIN_CLOUD_SERVICE')
    return Oracle_Blockchain_Cloud_Service
  }
  get_Oracle_Blockchain_Cloud_Service() {
    let Oracle_Blockchain_Cloud_Service = this._user.getUserByType('ORACLE_BLOCKCHAIN_CLOUD_SERVICE')
    return Oracle_Blockchain_Cloud_Service
  }

  // --------------------Create_PO---------------------------
  async Create_PO() {
    await this._user.checkUser(this.sender, 'ORACLE_SCM_CLOUD')
    let Create_PO = await this._stage.createStage('CREATE_PO')
    return Create_PO
  }
  get_Create_PO() {
    return this._stage.getStageByType('CREATE_PO')
  }


// --------------------Manufacturer_Goods---------------------------  
  async Manufacturer_Goods(address_Create_PO) {
    this._user.checkUser(this.sender, 'ORACLE_PAAS_APPLICATION')
    let check_Create_PO = this._stage.getStageByAddress(address_Create_PO)
    if (!check_Create_PO || check_Create_PO.type !== 'CREATE_PO')
      throw 'CREATE_PO IS NOT EXIST'
    let Manufacturer_Goods = await this._stage.createStage('MANUFACTURER_GOODS')
    return Manufacturer_Goods

  }
  get_Manufacturer_Goods() {
    return this._stage.getStageByType('MANUFACTURER_GOODS')
  }

  // --------------------Create_Product_Asset---------------------------
  async Create_Product_Asset(address_Manufacturer_Goods) {
    this._user.checkUser(this.sender, 'ORACLE_BLOCKCHAIN_CLOUD_SERVICE')
    let check_Manufacturer_Goods = this._stage.getStageByAddress(address_Manufacturer_Goods)
    if (!check_Manufacturer_Goods || check_Manufacturer_Goods.type !== 'MANUFACTURER_GOODS')
      throw 'MANUFACTURER_GOODS IS NOT EXIST'
    let Create_WO = await this._stage.createStage('CREATE_PRODUCT_ASSET')
    return Create_WO

  }

  get_Create_Product_Asset() {
    return this._stage.getStageByType('CREATE_PRODUCT_ASSET')
  }


  // --------------------Generate_Unique_Blockchain_Tag---------------------------
  async Generate_Unique_Blockchain_Tag(address_Create_Product_Asset) {
    this._user.checkUser(this.sender, 'ORACLE_BLOCKCHAIN_CLOUD_SERVICE')
    let check_Create_Product_Asset = this._stage.getStageByAddress(address_Create_Product_Asset)
    if (!check_Create_Product_Asset || check_Create_Product_Asset.type !== 'CREATE_PRODUCT_ASSET')
      throw 'CREATE_PRODUCT_ASSET IS NOT EXIST'
    let Generate_Unique_Blockchain_Tag = await this._stage.createStage('GENERATE_UNIQUE_BLOCKCHAIN_TAG')
    this.setToAddress(Generate_Unique_Blockchain_Tag.address)
    return 'SUCCESS'

  }
  get_Generate_Unique_Blockchain_Tag  () {
    return this._stage.getStageByType('GENERATE_UNIQUE_BLOCKCHAIN_TAG')
  }

  // --------------------Ship_Goods---------------------------
  async Ship_Goods(address_Manufacturer_Goods) {
    this._user.checkUser(this.sender, 'ORACLE_PAAS_APPLICATION')
    let check_Manufacturer_Goods = this._stage.getStageByAddress(address_Manufacturer_Goods)
    if (!check_Manufacturer_Goods || check_Manufacturer_Goods.type !== 'MANUFACTURER_GOODS')
      throw 'MANUFACTURER_GOODS IS NOT EXIST'
    let Ship_Goods = await this._stage.createStage('SHIP_GOODS')
    return Ship_Goods

  }

  get_Ship_Goods() {
    return this._stage.getStageByType('SHIP_GOODS')
  }

  // --------------------Receive_PO---------------------------
  async Receive_PO(address_Ship_Goods) {
    this._user.checkUser(this.sender, 'ORACLE_SCM_CLOUD')
    let check_Ship_Goods = this._stage.getStageByAddress(address_Ship_Goods)
    if (!check_Ship_Goods|| check_Ship_Goods.type !== 'SHIP_GOODS')
      throw 'SHIP_GOODS IS NOT EXIST'
    let Receive_PO = await this._stage.createStage('RECEIVE_PO')
    return Receive_PO

  }

  get_Receive_PO() {
    return this._stage.getStageByType('RECEIVE_PO')
  }
  // --------------------Transfer_Token---------------------------\\


  async Transfer_Token(address_Transfer_Token) {
    this._user.checkUser(this.sender, 'ORACLE_BLOCKCHAIN_CLOUD_SERVICE')
    let check_Receive_PO= this._stage.getStageByAddress(address_Transfer_Token)
    if (!check_Receive_PO || check_Receive_PO.type !== 'RECEIVE_PO')
      throw 'RECEIVE_PO IS NOT EXIST'
    let Transfer_Token = await this._stage.createStage('TRANSFER_TOKEN')
    return Transfer_Token
  }
  get_Transfer_Token() {
    return this._stage.getStageByType('TRANSFER_TOKEN')
  }

 
  // --------------------OwnershipTranfer---------------------------
  async OwnershipTranfer(address_Transfer_Token) {
    this._user.checkUser(this.sender, 'ORACLE_BLOCKCHAIN_CLOUD_SERVICE')
    let check_Transfer_Token= this._stage.getStageByAddress(address_Transfer_Token)
    if (!check_Transfer_Token || check_Transfer_Token.type !== 'TRANSFER_TOKEN')
      throw 'TRANSFER_TOKEN IS NOT EXIST'
    let OwnershipTranfer = await this._stage.createStage('OWNERSHIP_TRANFER')
    this.setToAddress(OwnershipTranfer.address)
    return 'SUCCESS'

  }

 
 




}
export default TokenMain;
