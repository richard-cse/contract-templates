import Contract from 'Contract'
import User from './user'
import Stage from './stage'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Oracle_SCM_cloud',
    'get_On_Premise_Application',
    'get_Oracle_Blockchain_Cloud_Service',
    'get_Create_PO',
    'get_Manufacturer_Goods',
    'get_Create_Product_Asset',
    'get_Generate_Unique_Blockchain_Tag',
    'get_Ship_Goods',
    'get_Receive_PO',
    'get_Verify_And_Transfer_Token',
    'get_Smart_Contract',
    'get_OwnershipTranfer',
    'get_Ship_Goods_to_Customer',
    'get_Verify_And_Transfer_Token_Of_Customer',



  ]
  static authenticationFuncs = [
    'Receive_PO_or_Smart_Contract',
    'Create_PO',
    'Manufacturer_Goods',
    'Create_Product_Asset',
    'Generate_Unique_Blockchain_Tag',
    'Ship_Goods',
    'Receive_PO',
    'Verify_And_Transfer_Token',
    'Smart_Contract',
    'OwnershipTranfer',
    'Ship_Goods_to_Customer',
    'Verify_And_Transfer_Token_Of_Customer',
    'OwnershipTranfer_Of_Customer',

  ]
  static publicFuncs = [


    'Oracle_SCM_cloud',
    'get_Oracle_SCM_cloud',
    'On_Premise_Application',
    'get_On_Premise_Application',    
    'Oracle_Blockchain_Cloud_Service',
    'get_Oracle_Blockchain_Cloud_Service',
    'Create_PO',
    'get_Create_PO',
    'Ship_Goods',
    'get_Ship_Goods',
    'Create_PO_or_Ship_goods',
    'Receive_PO',
    'get_Receive_PO',
    'Verify_And_Transfer_Token',
    'get_Verify_And_Transfer_Token',
    'OwnershipTranfer',
    'Ship_Goods_to_Customer',
    'get_Ship_Goods_to_Customer',
    'Verify_And_Transfer_Token_Of_Customer',
    'get_Verify_And_Transfer_Token_Of_Customer',
    'OwnershipTranfer_Of_Customer',
    

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
  async On_Premise_Application() {
    let On_Premise_Application = await this._user.createUser('ON_PREMISE_APPLICATION')
    return On_Premise_Application
  }
  get_On_Premise_Application() {
    let On_Premise_Application = this._user.getUserByType('ON_PREMISE_APPLICATION')
    return On_Premise_Application
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
 
  check_Create_PO(address) {
    let check_Create_PO = this.get_Create_POByAddress(address)
    if (!check_Create_PO || check_Create_PO.type !== 'CREATE_PO') throw `CREATE_PO IS NOT EXIST`
    return true
  }
  get_Create_POByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }

  async Create_PO() {
    await this._user.checkUser(this.sender, 'ON_PREMISE_APPLICATION')
    let Create_PO = await this._stage.createStage('CREATE_PO')
    return Create_PO
  }
  get_Create_PO() {
    return this._stage.getStageByType('CREATE_PO')
  }

  // --------------------Ship_Goods---------------------------
  check_Ship_Goods(address) {
    let check_Ship_Goods = this.get_Ship_GoodsByAddress(address)
    if (!check_Ship_Goods || check_Ship_Goods.type !== 'SHIP_GOODS') throw `SHIP_GOODS IS NOT EXIST`
    return true
  }
  get_Ship_GoodsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }

  async Ship_Goods(address_Create_PO) {
    this._user.checkUser(this.sender, 'ORACLE_SCM_CLOUD')
    let check_Create_PO = this._stage.getStageByAddress(address_Create_PO)
    if (!check_Create_PO|| check_Create_PO.type !== 'CREATE_PO')
      throw 'CREATE_PO IS NOT EXIST'
    let Ship_Goods = await this._stage.createStage('SHIP_GOODS')
    return Ship_Goods

  }

  get_Ship_Goods() {
    return this._stage.getStageByType('SHIP_GOODS')
  }

  // --------------------Receive_PO---------------------------

  checkCS(address) {
    this.check_Create_PO = this.get_Create_POByAddress(address);
    this.check_Ship_Goods = this.get_Ship_GoodsByAddress(address);

    if (this.check_Create_PO.type == 'CREATE_PO') {
      return true;
    }
    else if (this.check_Ship_Goods.type == 'SHIP_GOODS') {
      return true;
    }
    else {
      throw `CREATE_PO_OR_SHIP_GOODS_OF_CS IS NOT EXIST`;

    }

  }
  async Create_PO_or_Ship_goods() {
    this.checkCS(this.sender, 'CREATE_PO_OR_SHIP_GOODS_OF_CS')
    let CS = await this._stage.createStage('CREATE_PO_OR_SHIP_GOODS')
    return CS

  }

  async Receive_PO(address_Create_PO_or_Ship_goods) {
    this._user.checkUser(this.sender, 'ON_PREMISE_APPLICATION')
    let check_Create_PO_or_Ship_goods = this._stage.getStageByAddress(address_Create_PO_or_Ship_goods)
    if (!check_Create_PO_or_Ship_goods|| check_Create_PO_or_Ship_goods.type !== 'CREATE_PO_OR_SHIP_GOODS')
      throw 'CREATE_PO_OR_SHIP_GOODS IS NOT EXIST'
    let Receive_PO = await this._stage.createStage('RECEIVE_PO')
    return Receive_PO

  }

  get_Receive_PO() {
    return this._stage.getStageByType('RECEIVE_PO')
  }
    // --------------------Verify_And_Transfer_Token--------------------------

    async Verify_And_Transfer_Token(address_Receive_PO) {
      this._user.checkUser(this.sender, 'ORACLE_BLOCKCHAIN_CLOUD_SERVICE')
      let check_Receive_PO= this._stage.getStageByAddress(address_Receive_PO)
      if (!check_Receive_PO || check_Receive_PO.type !== 'RECEIVE_PO')
        throw 'RECEIVE_PO IS NOT EXIST'
      let vatt = await this._stage.createStage('VERIFY_AND_TRANSFER_TOKEN')
      return vatt
    
    }

  
    get_Verify_And_Transfer_Token() {
      return this._stage.getStageByType('VERIFY_AND_TRANSFER_TOKEN')
    }
  
  // --------------------OwnershipTranfer---------------------------
 
  async OwnershipTranfer(address_Verify_And_Transfer_Token) {
    this._user.checkUser(this.sender, 'ORACLE_BLOCKCHAIN_CLOUD_SERVICE')
    let check_Verify_And_Transfer_Token= this._stage.getStageByAddress(address_Verify_And_Transfer_Token)
    if (!check_Verify_And_Transfer_Token|| check_Verify_And_Transfer_Token.type !== 'VERIFY_AND_TRANSFER_TOKEN')
      throw 'VERIFY_AND_TRANSFER_TOKEN IS NOT EXIST'
    let OwnershipTranfer = await this._stage.createStage('OWNERSHIP_TRANFER')
    this.setToAddress(OwnershipTranfer.address)
    return 'SUCCESS'

  }


  // --------------------Ship_Goods_to_Customer---------------------------

  async Ship_Goods_to_Customer(address_Receive_PO) {
    this._user.checkUser(this.sender, 'ON_PREMISE_APPLICATION')
    let check_Receive_PO = this._stage.getStageByAddress(address_Receive_PO)
    if (!check_Receive_PO|| check_Receive_PO.type !== 'RECEIVE_PO')
      throw 'RECEIVE_PO IS NOT EXIST'
    let Ship_Goods_to_Customer = await this._stage.createStage('SHIP_GOODS_TO_CUSTOMER_OF_CUSTOMER')
    return Ship_Goods_to_Customer

  }

  get_Ship_Goods_to_Customer() {
    return this._stage.getStageByType('SHIP_GOODS_TO_CUSTOMER_OF_CUSTOMER')
  }
 
 
 // --------------------Verify_And_Transfer_Token_Of_Customer---------------------------

 async Verify_And_Transfer_Token_Of_Customer(address_Ship_Goods_to_Customer) {
  this._user.checkUser(this.sender, 'ORACLE_BLOCKCHAIN_CLOUD_SERVICE')
  let check_Ship_Goods_of_Customer= this._stage.getStageByAddress(address_Ship_Goods_to_Customer)
  if (!check_Ship_Goods_of_Customer || check_Ship_Goods_of_Customer.type !== 'SHIP_GOODS_TO_CUSTOMER_OF_CUSTOMER')
    throw 'SHIP_GOODS_TO_CUSTOMER_OF_CUSTOMER IS NOT EXIST'
  let vattoc = await this._stage.createStage('VERIFY_AND_TRANSFER_TOKEN_OF_CUSTOMER')
  return vattoc

}

get_Verify_And_Transfer_Token_Of_Customer() {
  return this._stage.getStageByType('VERIFY_AND_TRANSFER_TOKEN_OF_CUSTOMER')
}

// --------------------OwnershipTranfer_Of_Customer---------------------------

async OwnershipTranfer_Of_Customer(address_Verify_And_Transfer_Token_Of_Customer) {
this._user.checkUser(this.sender, 'ORACLE_BLOCKCHAIN_CLOUD_SERVICE')
let check_Verify_And_Transfer_Token_Of_Customer= this._stage.getStageByAddress(address_Verify_And_Transfer_Token_Of_Customer)
if (!check_Verify_And_Transfer_Token_Of_Customer|| check_Verify_And_Transfer_Token_Of_Customer.type !== 'VERIFY_AND_TRANSFER_TOKEN_OF_CUSTOMER')
  throw 'VERIFY_AND_TRANSFER_TOKEN_OF_CUSTOMER IS NOT EXIST'
let OwnershipTranfer_Of_Customer = await this._stage.createStage('OWNERSHIP_TRANFER_OF_CUSTOMER')
this.setToAddress(OwnershipTranfer_Of_Customer.address)
return 'SUCCESS'

}




}
export default TokenMain;
