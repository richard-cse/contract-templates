import Contract from 'Contract'
import Process from './process'
import User from './user'
import QS from './qs'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Promoter_pitches_service_to_merchant',
    'get_Merchant_agress_to_set_up_shop',
    'get_Promoter_collects_KYC_information_and_send_pictures_of_same_to_Data_Management_Centre',
    'get_Merchant_gives_missed_call_from_mobile_number_on_toll_free_number',
    'get_Promotor_takes_picture_of_shop_from_and_visiting_card_and_sends_to_back_office',
    'get_Takes_digital_signature_of_merchant_with_time_stamp',
    'get_Save_entry_in_data_bank_send_pictures_to_Data_Centre',
    'getYes',
    'getNo'

  ]
  
  static authenticationFuncs = [
    'Merchant_agress_to_set_up_shop',
    'Promoter_collects_KYC_information_and_send_pictures_of_same_to_Data_Management_Centre',
    'Merchant_gives_missed_call_from_mobile_number_on_toll_free_number',
    'Promotor_takes_picture_of_shop_from_and_visiting_card_and_sends_to_back_office',
    'Takes_digital_signature_of_merchant_with_time_stamp',
    'Save_entry_in_data_bank_send_pictures_to_Data_Centre',
    'Data_Management_Centre',
  ]
  static publicFuncs = [
    'Promoter_pitches_service_to_merchant',
    'get_Promoter_pitches_service_to_merchant',
    'Merchant_agress_to_set_up_shop',
    'getYes',
    'getNo',
    'get_Merchant_agress_to_set_up_shop',
    'Promoter_collects_KYC_information_and_send_pictures_of_same_to_Data_Management_Centre',
    'get_Promoter_collects_KYC_information_and_send_pictures_of_same_to_Data_Management_Centre',
    'Merchant_gives_missed_call_from_mobile_number_on_toll_free_number',
    'get_Merchant_gives_missed_call_from_mobile_number_on_toll_free_number',
    'Promotor_takes_picture_of_shop_from_and_visiting_card_and_sends_to_back_office',
    'get_Promotor_takes_picture_of_shop_from_and_visiting_card_and_sends_to_back_office',
    'Takes_digital_signature_of_merchant_with_time_stamp',
    'get_Takes_digital_signature_of_merchant_with_time_stamp',
    'Save_entry_in_data_bank_send_pictures_to_Data_Centre',
    'get_Save_entry_in_data_bank_send_pictures_to_Data_Centre',
    'Data_Management_Centre',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'MERCHANT_KYC'
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
    this._user = new User(data)
    this._qs=new QS(data)
  }
    //---------------------Promoter_pitches_service_to_merchant------------------------------
  async Promoter_pitches_service_to_merchant() {
    let Promoter = await this._user.createUser('PROMOTER_PITCHES_SERVICE_TO_MERCHANT')
    return Promoter

  }
  get_Promoter_pitches_service_to_merchant() {
    let Promoter = this._user.getUserByType('PROMOTER_PITCHES_SERVICE_TO_MERCHANT')
    return Promoter
  }

  
    //---------------------Merchant_agress_to_set_up_shop------------------------------

    async Merchant_agress_to_set_up_shop(type) {
      if (!type || !this.sender) throw 'CANNOT CREATE'
      if (![1, 2, 3].includes(Number(type))) throw 'CREATE QS FAIL'
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
    //---------------------Promoter_collects_KYC_information_and_send_pictures_of_same_to_Data_Management_Centre------------------------------
  checkPromoter_collects_KYC(address) {
    let checkPromoter_collects_KYC = this.getPromoter_collectsByAddress(address)
    if (!checkPromoter_collects_KYC || checkPromoter_collects_KYC.type !== 'PROMOTER_COLLECTS_KYC_INFORMATION_AND_SEND_PICTURES_OF_SAME_TO_DATA_MANAGEMENT_CENTRE') throw `PROMOTER_COLLECTS_KYC_INFORMATION_AND_SEND_PICTURES_OF_SAME_TO_DATA_MANAGEMENT_CENTRE IS NOT EXIST`
    return true
  }
  getPromoter_collectsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Promoter_collects_KYC_information_and_send_pictures_of_same_to_Data_Management_Centre() {
    await this.check_Associates(this.sender, 'ASSOCIATES_TALLY_TIME_OF_MISSED_CALL_WITH_TIME_OF_DIGITAL_SIGNATURE')
    let collects_KYC = await this._process.createProcess('PROMOTER_COLLECTS_KYC_INFORMATION_AND_SEND_PICTURES_OF_SAME_TO_DATA_MANAGEMENT_CENTRE')
    return collects_KYC
  }

  get_Promoter_collects_KYC_information_and_send_pictures_of_same_to_Data_Management_Centre() {
    return this._process.getProcessByType('PROMOTER_COLLECTS_KYC_INFORMATION_AND_SEND_PICTURES_OF_SAME_TO_DATA_MANAGEMENT_CENTRE')
  }
    //---------------------Merchant_gives_missed_call_from_mobile_number_on_toll_free_number------------------------------
  checkMerchant(address) {
    let checkMerchant = this.getMerchantByAddress(address)
    if (!checkMerchant | checkMerchant.type !== 'MERCHANT_GIVES_MISSED_CALL_FROM_MOBILE_NUMBER_ON_TOLL_FREE_NUMBER') throw `MERCHANT_GIVES_MISSED_CALL_FROM_MOBILE_NUMBER_ON_TOLL_FREE_NUMBER IS NOT EXIST`
    return true
  }
  getMerchantByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Merchant_gives_missed_call_from_mobile_number_on_toll_free_number() {
    await this.checkPromoter_collects_KYC(this.sender, 'PROMOTER_COLLECTS_KYC_INFORMATION_AND_SEND_PICTURES_OF_SAME_TO_DATA_MANAGEMENT_CENTRE')
    let Merchant = await this._process.createProcess('MERCHANT_GIVES_MISSED_CALL_FROM_MOBILE_NUMBER_ON_TOLL_FREE_NUMBER')
    return Merchant
  }

  get_Merchant_gives_missed_call_from_mobile_number_on_toll_free_number() {
    return this._process.getProcessByType('MERCHANT_GIVES_MISSED_CALL_FROM_MOBILE_NUMBER_ON_TOLL_FREE_NUMBER')
  }
    //---------------------Promotor_takes_picture_of_shop_from_and_visiting_card_and_sends_to_back_office------------------------------
  checkPromotor_takes_picture(address) {
    let checkPromotor_takes_picture = this.getPromotor_takes_pictureByAddress(address)
    if (!checkPromotor_takes_picture | checkPromotor_takes_picture.type !== 'PROMOTOR_TAKES_PICTURE_OF_SHOP_FROM_AND_VISITING_CARD_AND_SEND_TO_BACK_OFFICE') throw `PROMOTOR_TAKES_PICTURE_OF_SHOP_FROM_AND_VISITING_CARD_AND_SEND_TO_BACK_OFFICE IS NOT EXIST`
    return true
  }
  getPromotor_takes_pictureByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Promotor_takes_picture_of_shop_from_and_visiting_card_and_sends_to_back_office() {
    await this.checkMerchant(this.sender, 'VERIFY_ON_SITE_IMAGERY')
    let leader = await this._process.createProcess('PROMOTOR_TAKES_PICTURE_OF_SHOP_FROM_AND_VISITING_CARD_AND_SEND_TO_BACK_OFFICE')
    return leader
  }

  get_Promotor_takes_picture_of_shop_from_and_visiting_card_and_sends_to_back_office() {
    return this._process.getProcessByType('VERIFY_ON_SITE_IMAGERY')
  }
     //---------------------Takes_digital_signature_of_merchant_with_time_stamp------------------------------
     checkTakes_digital(address) {
      let checkTakes_digital = this.getTakes_digitalByAddress(address)
      if (!checkTakes_digital | checkTakes_digital.type !== 'TAKES_DIGITAL_SIGNATURE_OF_MERCHANT_WITH_TIME_STAMP') throw `TAKES_DIGITAL_SIGNATURE_OF_MERCHANT_WITH_TIME_STAMP IS NOT EXIST`
      return true
    }
    getTakes_digitalByAddress(address) {
      return this.accounts.find(account => account.address === address)
    }
    async Takes_digital_signature_of_merchant_with_time_stamp() {
      await this.checkPromotor_takes_picture(this.sender, 'PROMOTOR_TAKES_PICTURE_OF_SHOP_FROM_AND_VISITING_CARD_AND_SEND_TO_BACK_OFFICE')
      let leader = await this._process.createProcess('TAKES_DIGITAL_SIGNATURE_OF_MERCHANT_WITH_TIME_STAMP')
      return leader
    }
  
    get_Takes_digital_signature_of_merchant_with_time_stamp() {
      return this._process.getProcessByType('TAKES_DIGITAL_SIGNATURE_OF_MERCHANT_WITH_TIME_STAMP')
    }
    //---------------------Save_entry_in_data_bank_send_pictures_to_Data_Centre------------------------------
    checkSave_entry(address) {
      let checkSave_entry = this.getSave_entryByAddress(address)
      if (!checkSave_entry | checkSave_entry.type !== 'SAVE_ENTRY_IN_DATA_BANK_SEND_PICTURES_TO_DATA_CENTRE') throw `SAVE_ENTRY_IN_DATA_BANK_SEND_PICTURES_TO_DATA_CENTRE IS NOT EXIST`
      return true
    }
    getSave_entryByAddress(address) {
      return this.accounts.find(account => account.address === address)
    }
  async Save_entry_in_data_bank_send_pictures_to_Data_Centre() {
    await this.checkTakes_digital(this.sender, 'TAKES_DIGITAL_SIGNATURE_OF_MERCHANT_WITH_TIME_STAMP')
    let Operations = await this._process.createProcess('SAVE_ENTRY_IN_DATA_BANK_SEND_PICTURES_TO_DATA_CENTRE')
    this.setToAddress(Operations.address)
    return 'SUCCESS'
  }
  async Data_Management_Centre() {
    await this.checkSave_entry(this.sender, 'SAVE_ENTRY_IN_DATA_BANK_SEND_PICTURES_TO_DATA_CENTRE')
    let Data = await this._process.createProcess('DATA_MANAGEMENT_CENTRE')
    this.setToAddress(Data.address)
    return 'SUCCESS'
  }
}
export default TokenMain 
