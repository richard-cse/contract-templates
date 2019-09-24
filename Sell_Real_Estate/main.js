import Contract from 'Contract'
import Sell from './sell'
import Obj from './obj'
class TokenMain extends Contract {
  static viewFuncs = [
    'getStart_With_a_realtor_you_trust',
    'getAgent_meets_with_seller_to_tour_home',
    //'getReview_and_complete_paperwork',
    'getReview_and_complete_paperwork',
    'getAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes',
    'getSeller_and_Agent_Establish_Listing_Price',
    'getHome_is_Prepared_for_Sale',
    'getPurchase_Offer_presented_to_Seller',
    'getNegotiate_and_Counteroffers',
    'getAccepted_Sales_Contract',
    'getFacilitate_Property_Inspections_Appraisal_Survey',
    'getAdditional_negotiations_if_necessary'
   

 

  ]
  static authenticationFuncs = [
   
    'createAgent_meets_with_seller_to_tour_home',
   // 'createReview_and_complete_paperwork',
   'createReview_and_complete_paperwork',
    'addWorking_with_real_Estate_Agents',
    'addListing_Agreement_Dual_Agency_Addendum',
    'addSeller_Disclosure_Statement',
    'addLead_Based_Paint_Hazard_Addendum',
    'createAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes',
    'createSeller_and_Agent_Establish_Listing_Price',
    'createHome_is_Prepared_for_Sale',
    'addCleaning',
    'addPainting',
    'addRepairing',
    'addImprovements',
    'addStaging',
    'addHome_is_entered_into_Multiple_Listing_Service',
    'addAdvertising_is_initiated',
    'addHome_Brochures_are_created',
    'addOpen_Houses',
    'addShowing_by_appointment',
    'createPurchase_Offer_presented_to_Seller',
    'createNegotiate_and_Counteroffers',
    'createAccepted_Sales_Contract',
    'createFacilitate_Property_Inspections_Appraisal_Survey',
    'createAdditional_negotiations_if_necessary',
    'createClose_on_Property_and_turn_over_possession',
  ]
  static publicFuncs = [
    'createStart_With_a_realtor_you_trust',
    'getStart_With_a_realtor_you_trust',
    'createAgent_meets_with_seller_to_tour_home',
    'getAgent_meets_with_seller_to_tour_home',
    'createReview_and_complete_paperwork',
    'getReview_and_complete_paperwork',
    'addWorking_with_real_Estate_Agents',
    'addListing_Agreement_Dual_Agency_Addendum',
    'addSeller_Disclosure_Statement',
    'addLead_Based_Paint_Hazard_Addendum',
    'createAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes',
    'getAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes',
    'createSeller_and_Agent_Establish_Listing_Price',
    'getSeller_and_Agent_Establish_Listing_Price',
    'createHome_is_Prepared_for_Sale',
    'getHome_is_Prepared_for_Sale',
    'addCleaning',
    'addPainting',
    'addRepairing',
    'addImprovements',
    'addStaging',
    'addHome_is_entered_into_Multiple_Listing_Service',
    'addAdvertising_is_initiated',
    'addHome_Brochures_are_created',
    'addOpen_Houses',
    'addShowing_by_appointment',
    'createPurchase_Offer_presented_to_Seller',
    'getPurchase_Offer_presented_to_Seller',
    'createNegotiate_and_Counteroffers',
    'getNegotiate_and_Counteroffers',
    'createAccepted_Sales_Contract',
    'getAccepted_Sales_Contract',
    'createFacilitate_Property_Inspections_Appraisal_Survey',
    'getFacilitate_Property_Inspections_Appraisal_Survey',
    'createAdditional_negotiations_if_necessary',
    'getAdditional_negotiations_if_necessary',
    'createClose_on_Property_and_turn_over_possession',

  
  ]
  static schemas = {
    name: {
      type: String,
      default: 'SELL_BDS'
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
    this._sell = new Sell(data)
    this._obj =new Obj(data)
  }
  //---------------------REALTOR------------------------------

  async createStart_With_a_realtor_you_trust() {
    let realtor = await this._obj.createObj('REALTOR')
    return realtor
    
  }
  getStart_With_a_realtor_you_trust() {
    let realtor = this._obj.getObjByType('REALTOR')
    return realtor
  }

  // --------------------'create_Agent_meets_with_seller_to_tour_home',L---------------------------
  
 
  async createAgent_meets_with_seller_to_tour_home() {
    await this._obj.checkObj(this.sender, 'REALTOR')
    let seller = await this._sell.createSell('SELLER')
    return seller
  }
  
  getAgent_meets_with_seller_to_tour_home() {
    return this._obj.getObjByType('SELLER')
  }

  // --------------------createReview_and_complete_paperwork-------------------------
  
  checkReview_and_complete_paperwork(address) {
    let checkReview_and_complete_paperwork= this.getReview_and_complete_paperworkByAddress(address)
    if (!checkReview_and_complete_paperwork|| checkReview_and_complete_paperwork.type !== 'REVIEW_AND_COMPLETE') throw `REVIEW_AND_COMPLETE IS NOT EXIST`
    return true
  }
  getReview_and_complete_paperworkByAddress(address) {
    return this.accounts.find(account => account.address === address)
  } 
  async createReview_and_complete_paperwork() {
    await this._obj.checkObj(this.sender, 'SELLER')
    let Review_and_complete = await this._sell.createSell('REVIEW_AND_COMPLETE')
    return Review_and_complete
  }
  
  getReview_and_complete_paperwork() {
    return this._sell.getSellByType('REVIEW_AND_COMPLETE')
  }

  // --------------------add_Working_with_real_Estate_Agents---------------------------
  
  checkWorking_with_real_Estate_Agents(address) {
    let checkWorking_with_real_Estate_Agents = this.getWorking_with_real_Estate_AgentsByAddress(address)
    if (!checkWorking_with_real_Estate_Agents|| checkWorking_with_real_Estate_Agents.type !== 'WORKING_WITH_REAL_ESTATE_AGENTS') throw `WORKING_WITH_REAL_ESTATE_AGENTS IS NOT EXIST`
    return true
  }
  getWorking_with_real_Estate_AgentsByAddress (address) {
    return this.accounts.find(account => account.address === address)
  } 
  async addWorking_with_real_Estate_Agents() {
    await this.checkReview_and_complete_paperwork(this.sender, 'REVIEW_AND_COMPLETE')
    let estate_Agent = await this._sell.createSell('WORKING_WITH_REAL_ESTATE_AGENTS')
    return estate_Agent
  }

  // --------------------addListing_Agreement_Dual_Agency_Addendum---------------------------
 
  
  checkListing_Agreement_Dual_Agency_Addendum(address) {
    let checkListing_Agreement_Dual_Agency_Addendum = this.getListing_Agreement_Dual_Agency_AddendumByAddress(address)
    if (!checkListing_Agreement_Dual_Agency_Addendum|| checkListing_Agreement_Dual_Agency_Addendum.type !== 'LISTING_AGREEMENT_DUAL_AGENCY_ADDENDUM') throw `LISTING_AGREEMENT_DUAL_AGENCY_ADDENDUM IS NOT EXIST`
    return true
  }
  getListing_Agreement_Dual_Agency_AddendumByAddress (address) {
    return this.accounts.find(account => account.address === address)
  } 
  async addListing_Agreement_Dual_Agency_Addendum() {
    await this.checkWorking_with_real_Estate_Agents(this.sender, 'WORKING_WITH_REAL_ESTATE_AGENTS')
    let Listing_Agreement_Dual_Agency_Addendum = await this._sell.createSell('LISTING_AGREEMENT_DUAL_AGENCY_ADDENDUM')
    return Listing_Agreement_Dual_Agency_Addendum
  }

   // --------------------addSeller_Disclosure_Statement---------------------------
   
  checkSeller_Disclosure_Statement(address) {
    let checkSeller_Disclosure_Statement = this.getSeller_Disclosure_StatementByAddress(address)
    if (!checkSeller_Disclosure_Statement|| checkSeller_Disclosure_Statement.type !== 'SELLER_DISCLOSURE_STATEMENT') throw `SELLER_DISCLOSURE_STATEMENT IS NOT EXIST`
    return true
  }
  getSeller_Disclosure_StatementByAddress (address) {
    return this.accounts.find(account => account.address === address)
  } 
  async addSeller_Disclosure_Statement() {
    await this.checkListing_Agreement_Dual_Agency_Addendum(this.sender, 'LISTING_AGREEMENT_DUAL_AGENCY_ADDENDUM')
    let Seller_Disclosure_Statement = await this._sell.createSell('SELLER_DISCLOSURE_STATEMENT')
    return Seller_Disclosure_Statement
  }


  // --------------------addLead_Based_Paint_Hazard_Addendum ---------------------------
  
 
  
  checkLead_Based_Paint_Hazard_Addendum(address) {
    let checkLead_Based_Paint_Hazard_Addendum = this.getLead_Based_Paint_Hazard_AddendumByAddress(address)
    if (!checkLead_Based_Paint_Hazard_Addendum|| checkLead_Based_Paint_Hazard_Addendum.type !== 'LEAD_BASED_PAINT_HAZARD_ADDENDUM') throw `LEAD_BASED_PAINT_HAZARD_ADDENDUM IS NOT EXIST`
    return true
  }
  getLead_Based_Paint_Hazard_AddendumByAddress (address) {
    return this.accounts.find(account => account.address === address)
  } 
  async addLead_Based_Paint_Hazard_Addendum() {
    await this.checkSeller_Disclosure_Statement(this.sender, 'SELLER_DISCLOSURE_STATEMENT')
    let Lead_Based_Paint_Hazard_Addendum = await this._sell.createSell('LEAD_BASED_PAINT_HAZARD_ADDENDUM')
    return Lead_Based_Paint_Hazard_Addendum
  }


 // --------------------createAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes ---------------------------
 checkAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes (address) {
  let checkAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes = this.getAgent_analyzes_market_data_and_presents_Comparable_Market_AnalyzesByAddress(address)
  if (!checkAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes|| checkAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes.type !== 'AGENT_ANALYZEZ_MARKET_DATA_AND_PRESENTS_COMPARABLE_MARKET_ANALYZES') throw `AGENT_ANALYZEZ_MARKET_DATA_AND_PRESENTS_COMPARABLE_MARKET_ANALYZES IS NOT EXIST`
  return true
}
getAgent_analyzes_market_data_and_presents_Comparable_Market_AnalyzesByAddress(address) {
  return this.accounts.find(account => account.address === address)
}
 async createAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes() {
  await this.checkLead_Based_Paint_Hazard_Addendum(this.sender, 'LEAD_BASED_PAINT_HAZARD_ADDENDUM')
  let  agent_Analyzes= await this._sell.createSell('AGENT_ANALYZEZ_MARKET_DATA_AND_PRESENTS_COMPARABLE_MARKET_ANALYZES')
  return agent_Analyzes
}

 
getAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes() {
  return this._sell.getSellByType('AGENT_ANALYZEZ_MARKET_DATA_AND_PRESENTS_COMPARABLE_MARKET_ANALYZES')
}
 // --------------------createSeller_and_Agent_Establish_Listing_Price ---------------------------
 //this.getAgent_analyzes_market_data_and_presents_Comparable_Market_AnalyzesByAddress
 checkSeller_and_Agent_Establish_Listing_Price (address) {
  let checkSeller_and_Agent_Establish_Listing_Price = this.getSeller_and_Agent_Establish_Listing_PriceByAddress(address)
  if (!checkSeller_and_Agent_Establish_Listing_Price || checkSeller_and_Agent_Establish_Listing_Price.type !== 'SELLER_AND_AGENT_ESTABLISH_LISTING_PRICE') throw `SELLER_AND_AGENT_ESTABLISH_LISTING_PRICE IS NOT EXIST`
  return true
}
getSeller_and_Agent_Establish_Listing_PriceByAddress (address) {
  return this.accounts.find(account => account.address === address)
}
 async createSeller_and_Agent_Establish_Listing_Price() {
  await this.checkAgent_analyzes_market_data_and_presents_Comparable_Market_Analyzes(this.sender, 'AGENT_ANALYZEZ_MARKET_DATA_AND_PRESENTS_COMPARABLE_MARKET_ANALYZES')
  let  Seller_and_Agent_Establish_Listing_Price= await this._sell.createSell('SELLER_AND_AGENT_ESTABLISH_LISTING_PRICE')
  return Seller_and_Agent_Establish_Listing_Price
}

 
getSeller_and_Agent_Establish_Listing_Price() {
  return this._sell.getSellByType('SELLER_AND_AGENT_ESTABLISH_LISTING_PRICE')
}
// --------------------createHome_is_Prepared_for_Sale ---------------------------
checkHome_is_Perpared_for_Sale(address) {
  let checkHome_is_Prepared_for_Sale= this.getHome_is_Prepared_for_SaleByAddress(address)
  if (!checkHome_is_Prepared_for_Sale|| checkHome_is_Prepared_for_Sale.type !== 'HOME_IS_PREPARED_FOR_SALE') throw `HOME_IS_PREPARED_FOR_SALE IS NOT EXIST`
  return true
}
getHome_is_Prepared_for_SaleByAddress(address) {
  return this.accounts.find(account => account.address === address)
}
 async createHome_is_Prepared_for_Sale() {
  await this.checkSeller_and_Agent_Establish_Listing_Price(this.sender, 'SELLER_AND_AGENT_ESTABLISH_LISTING_PRICE')
  let Prepared = await this._sell.createSell('HOME_IS_PREPARED_FOR_SALE')
  return Prepared
}

 
getHome_is_Prepared_for_Sale() {
  return this._sell.getSellByType('HOME_IS_PREPARED_FOR_SALE')
}
// --------------------addCleaning ---------------------------
checkCleaning  (address) {
  let checkCleaning = this.getCleaningByAddress(address)
  if (!checkCleaning  || checkCleaning .type !== 'CLEANING') throw `CLEANING IS NOT EXIST`
  return true
}
getCleaningByAddress (address) {
  return this.accounts.find(account => account.address === address)
}
 async addCleaning() {
  await this.checkHome_is_Perpared_for_Sale(this.sender, 'HOME_IS_PREPARED_FOR_SALE')
  let  clean= await this._sell.createSell('CLEANING')
  return clean
}


// --------------------addPainting ---------------------------


checkPainting(address) {
  let checkPainting = this.getPaintingByAddress(address)
  if (!checkPainting || checkPainting.type !== 'PAINTING') throw `PAINTING IS NOT EXIST`
  return true
}
getPaintingByAddress (address) {
  return this.accounts.find(account => account.address === address)
}
 async addPainting() {
  await this.checkCleaning(this.sender, 'CLEANING')
  let  Painting= await this._sell.createSell('PAINTING')
  return Painting
}

 

// --------------------addRepairing ---------------------------


checkRepairing(address) {
  let checkRepairing = this.getRepairingByAddress(address)
  if (!checkRepairing || checkRepairing.type !== 'REPAIRING') throw `REPAIRING IS NOT EXIST`
  return true
}
getRepairingByAddress (address) {
  return this.accounts.find(account => account.address === address)
}
 async addRepairing() {
  await this.checkPainting(this.sender, 'PAINTING')
  let  Repairing= await this._sell.createSell('REPAIRING')
  return Repairing
}


// --------------------addImprovements ---------------------------


checkImprovements (address) {
  let checkImprovements = this.getImprovementsByAddress(address)
  if (!checkImprovements || checkImprovements.type !== 'IMPROVEMENTS') throw `IMPROVEMENTS IS NOT EXIST`
  return true
}
getImprovementsByAddress (address) {
  return this.accounts.find(account => account.address === address)
}
 async addImprovements() {
  await this.checkRepairing(this.sender, 'REPAIRING')
  let  Improvements= await this._sell.createSell('IMPROVEMENTS')
  return Improvements
}

 

// --------------------addStaging ---------------------------

checkStaging (address) {
  let checkStaging  = this.getStagingByAddress(address)
  if (!checkStaging  || checkStaging.type !== 'STAGING') throw `STAGING IS NOT EXIST`
  return true
}
getStagingByAddress (address) {
  return this.accounts.find(account => account.address === address)
}
 async addStaging() {
  await this.checkImprovements(this.sender, 'IMPROVEMENTS')
  let  Staging = await this._sell.createSell('STAGING')
  return Staging 
}
// --------------------addHome_is_entered_into_Multiple_Listing_Service ---------------------------


checkHome_is_entered_into_Multiple_Listing_Service (address) {
  let checkHome_is_entered_into_Multiple_Listing_Service  = this.getHome_is_entered_into_Multiple_Listing_ServiceByAddress(address)
  if (!checkHome_is_entered_into_Multiple_Listing_Service || checkHome_is_entered_into_Multiple_Listing_Service.type !== 'HOME_IS_ENTERED_INTO_MULTIPLE_LISTING_SERVICE') throw `HOME_IS_ENTERED_INTO_MULTIPLE_LISTING_SERVICE IS NOT EXIST`
  return true
}
getHome_is_entered_into_Multiple_Listing_ServiceByAddress (address) {
  return this.accounts.find(account => account.address === address)
}
 async addHome_is_entered_into_Multiple_Listing_Service() {
  await this.checkStaging(this.sender, 'STAGING')
  let  Home_is_entered_into_Multiple_Listing_Service = await this._sell.createSell('HOME_IS_ENTERED_INTO_MULTIPLE_LISTING_SERVICE')
  return Home_is_entered_into_Multiple_Listing_Service 
}
// --------------------addAdvertising_is_initiated ---------------------------

checkAdvertising_is_initiated(address) {
  let checkAdvertising_is_initiated  = this.getAdvertising_is_initiatedByAddress(address)
  if (!checkAdvertising_is_initiated || checkAdvertising_is_initiated.type !== 'ADVERTISING_IS_INITIATED') throw `ADVERTISING_IS_INITIATED IS NOT EXIST`
  return true
}
getAdvertising_is_initiatedByAddress (address) {
  return this.accounts.find(account => account.address === address)
}
 async addAdvertising_is_initiated() {
  await this.checkHome_is_entered_into_Multiple_Listing_Service(this.sender, 'HOME_IS_ENTERED_INTO_MULTIPLE_LISTING_SERVICE')
  let  Advertising_is_initiated = await this._sell.createSell('ADVERTISING_IS_INITIATED')
  return Advertising_is_initiated 
}
// --------------------addHome_Brochures_are_created ---------------------------

checkHome_Brochures_are_created(address) {
  let checkHome_Brochures_are_created  = this.getHome_Brochures_are_createdByAddress(address)
  if (!checkHome_Brochures_are_created|| checkHome_Brochures_are_created.type !== 'HOME_BROCHUES_ARE_CREATE') throw `HOME_BROCHUES_ARE_CREATE IS NOT EXIST`
  return true
}
getHome_Brochures_are_createdByAddress (address) {
  return this.accounts.find(account => account.address === address)
}
 async addHome_Brochures_are_created() {
  await this.checkAdvertising_is_initiated(this.sender, 'ADVERTISING_IS_INITIATED')
  let  Home_Brochures_are_created = await this._sell.createSell('HOME_BROCHUES_ARE_CREATE')
  return Home_Brochures_are_created 
}
// --------------------addOpen_Houses ---------------------------

checkOpen_Houses(address) {
  let checkOpen_Houses  = this.getOpen_HousesByAddress(address)
  if (!checkOpen_Houses|| checkOpen_Houses.type !== 'OPEN_HOUSES') throw `OPEN_HOUSES IS NOT EXIST`
  return true
}
getOpen_HousesByAddress (address) {
  return this.accounts.find(account => account.address === address)
}
 async addOpen_Houses() {
  await this.checkHome_Brochures_are_created(this.sender, 'HOME_BROCHUES_ARE_CREATE')
  let  Open_Houses = await this._sell.createSell('OPEN_HOUSES')
  return Open_Houses 
}

// --------------------addShowing_by_appointment ---------------------------

checkShowing_by_appointment(address) {
  let checkShowing_by_appointment  = this.getShowing_by_appointmentByAddress(address)
  if (!checkShowing_by_appointment|| checkShowing_by_appointment.type !== 'SHOWING_BY_APPOINTMENT') throw `SHOWING_BY_APPOINTMENT IS NOT EXIST`
  return true
}
getShowing_by_appointmentByAddress (address) {
  return this.accounts.find(account => account.address === address)
}
 async addShowing_by_appointment() {
  await this.checkOpen_Houses(this.sender, 'OPEN_HOUSES')
  let  Showing_by_appointment = await this._sell.createSell('SHOWING_BY_APPOINTMENT')
  return Showing_by_appointment 
}



// --------------------createPurchase_Offer_presented_to_Seller ---------------------------
checkPurchase_Offer_presented_to_Seller (address) {
  let checkPurchase_Offer_presented_to_Seller = this.getPurchase_Offer_presented_to_SellerByAddress(address)
  if (!checkPurchase_Offer_presented_to_Seller|| checkPurchase_Offer_presented_to_Seller.type !== 'PURCHASE_OFFER_PRESENTED_TO_SELLER') throw `PURCHASE_OFFER_PRESENTED_TO_SELLER IS NOT EXIST`
  return true
}
getPurchase_Offer_presented_to_SellerByAddress(address) {
  return this.accounts.find(account => account.address === address)
}
 async createPurchase_Offer_presented_to_Seller() {
  await this.checkShowing_by_appointment(this.sender, 'SHOWING_BY_APPOINTMENT')
  let  Purchase_Offer_presented_to_Seller= await this._sell.createSell('PURCHASE_OFFER_PRESENTED_TO_SELLER')
  return Purchase_Offer_presented_to_Seller
}

 
getPurchase_Offer_presented_to_Seller() {
  return this._sell.getSellByType('PURCHASE_OFFER_PRESENTED_TO_SELLER')
}
// --------------------createNegotiate_and_Counteroffers ---------------------------
checkNegotiate_and_Counteroffers (address) {
  let checkNegotiate_and_Counteroffers = this.getNegotiate_and_CounteroffersByAddress(address)
  if (!checkNegotiate_and_Counteroffers|| checkNegotiate_and_Counteroffers.type !== 'NEGOTIATE_AND_COUNTEROFFERS') throw `NEGOTIATE_AND_COUNTEROFFERS IS NOT EXIST`
  return true
}
getNegotiate_and_CounteroffersByAddress(address) {
  return this.accounts.find(account => account.address === address)
}
 async createNegotiate_and_Counteroffers() {
  await this.checkPurchase_Offer_presented_to_Seller(this.sender, 'PURCHASE_OFFER_PRESENTED_TO_SELLER')
  let  Negotiate_and_Counteroffers= await this._sell.createSell('NEGOTIATE_AND_COUNTEROFFERS')
  return Negotiate_and_Counteroffers
}

 
getNegotiate_and_Counteroffers() {
  return this._sell.getSellByType('NEGOTIATE_AND_COUNTEROFFERS')
}


// --------------------createAccepted_Sales_Contract ---------------------------

checkAccepted_Sales_Contract(address) {
  let checkAccepted_Sales_Contract = this.getAccepted_Sales_ContractByAdress(address)
  if (!checkAccepted_Sales_Contract|| checkAccepted_Sales_Contract.type !== 'ACCEPTED_SALES_CONTRACT') throw `ACCEPTED_SALES_CONTRACT IS NOT EXIST`
  return true
}
getAccepted_Sales_ContractByAdress(address) {
  return this.accounts.find(account => account.address === address)
}
 async createAccepted_Sales_Contract() {
  await this.checkNegotiate_and_Counteroffers(this.sender, 'NEGOTIATE_AND_COUNTEROFFERS')
  let  Accepted_Sales_Contract= await this._sell.createSell('ACCEPTED_SALES_CONTRACT')
  return Accepted_Sales_Contract
}

 
getAccepted_Sales_Contract() {
  return this._sell.getSellByType('ACCEPTED_SALES_CONTRACT')
}
// --------------------createFacilitate_Property_Inspections_Appraisal_Survey ---------------------------


checkFacilitate_Property_Inspections_Appraisal_Survey(address) {
  let checkFacilitate_Property_Inspections_Appraisal_Survey = this.getFacilitate_Property_Inspections_Appraisal_SurveyByAddress(address)
  if (!checkFacilitate_Property_Inspections_Appraisal_Survey|| checkFacilitate_Property_Inspections_Appraisal_Survey.type !== 'FACILITATE_PROPERTY_INSPECTION_APPRAISAL_SURVEY') throw `FACILITATE_PROPERTY_INSPECTION_APPRAISAL_SURVEY IS NOT EXIST`
  return true
}
getFacilitate_Property_Inspections_Appraisal_SurveyByAddress(address) {
  return this.accounts.find(account => account.address === address)
}
 async createFacilitate_Property_Inspections_Appraisal_Survey() {
  await this.checkAccepted_Sales_Contract(this.sender, 'ACCEPTED_SALES_CONTRACT')
  let  Facilitate_Property_Inspections_Appraisal_Survey= await this._sell.createSell('FACILITATE_PROPERTY_INSPECTION_APPRAISAL_SURVEY')
  return Facilitate_Property_Inspections_Appraisal_Survey
}

 
getFacilitate_Property_Inspections_Appraisal_Survey() {
  return this._sell.getSellByType('FACILITATE_PROPERTY_INSPECTION_APPRAISAL_SURVEY')
}


  // --------------------createAdditional_negotiations_if_necessary ---------------------------


  checkAdditional_negotiations_if_necessary(address) {
    let checkAdditional_negotiations_if_necessary= this.getAdditional_negotiations_if_necessaryByAddress(address)
    if (!checkAdditional_negotiations_if_necessary|| checkAdditional_negotiations_if_necessary.type !== 'ADDITIONAL_NEGOTIATIONS_IF_NECESSARY') throw `ADDITIONAL_NEGOTIATIONS_IF_NECESSARY IS NOT EXIST`
    return true
  }
  getAdditional_negotiations_if_necessaryByAddress (address) {
    return this.accounts.find(account => account.address === address)
  } 
  async createAdditional_negotiations_if_necessary() {
    await this.checkFacilitate_Property_Inspections_Appraisal_Survey(this.sender, 'FACILITATE_PROPERTY_INSPECTION_APPRAISAL_SURVEY')
    let Additional_negotiations_if_necessary = await this._sell.createSell('ADDITIONAL_NEGOTIATIONS_IF_NECESSARY')
    return Additional_negotiations_if_necessary
  }
   
  getAdditional_negotiations_if_necessary() {
    return this._sell.getSellByType('ADDITIONAL_NEGOTIATIONS_IF_NECESSARY')
  } 
  
  // --------------------createClose_on_Property_and_turn_over_possession---------------------------
    async createClose_on_Property_and_turn_over_possession() {
      await this.checkAdditional_negotiations_if_necessary(this.sender, 'ADDITIONAL_NEGOTIATIONS_IF_NECESSARY')
    
      let Close_on_Property_and_turn_over_possessionlege = await this._sell.createSell('CLOSE_ON_PROPERTY_AND_TURN_OVER_POSSESSIONLEGE')
      this.setToAddress(Close_on_Property_and_turn_over_possessionlege.address)
      // return { Enduser }
      return 'CLOSE_SUCCESS'
    }








 

}
export default TokenMain;
