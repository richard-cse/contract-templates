import Contract from 'Contract'
import Process from './process'
import QS from './qs'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Human',
    'et_Read_Ultrasonic_Sensor',
    'et_Human_Detected',
    'get_YesHD',
    'get_NoHD',
    'get_Capture_Face_Image',
    'get_Face_Detection',
    'get_Face_Recognition',
    'get_Recognized_Face',
    'get_Yes',
    'get_No',
    'get_Door_Unlock',
    'get_Wait_for_30_second',
    'get_Door_Lock',
  ]

  static authenticationFuncs = [
    'Process',
    'Read_Ultrasonic_Sensor',
    'Human_Detected',
    'Capture_Face_Image',
    'Face_Detection',
    'Face_Recognition',
    'Recognized_Face',
    'Door_Unlock',
    'Wait_for_30_second',
    'Door_Lock',
  ]
  static publicFuncs = [
    'Human',
    'get_Human',
    'Process',
    'get_Process',
    'Read_Ultrasonic_Sensor',
    'get_Read_Ultrasonic_Sensor',
    'Human_Detected',
    'get_Human_Detected',
    'get_YesHD',
    'get_NoHD',
    'Capture_Face_Image',
    'get_Capture_Face_Image',
    'Face_Detection',
    'get_Face_Detection',
    'Face_Recognition',
    'get_Face_Recognition',
    'Recognized_Face',
    'get_Recognized_Face',
    'get_Yes',
    'get_No',
    'Door_Unlock',
    'get_Door_Unlock',
    'Wait_for_30_second',
    'get_Wait_for_30_second',
    'Door_Lock',
    'get_Door_Lock'

  ]
  static schemas = {
    name: {
      type: String,
      default: 'FACE_SECURITY'
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
    this._qs = new QS(data)
  }
  //---------------------Human------------------------------
  async Hunman() {
    let Hunman = await this._user.createUser('HUMAN')
    return Hunman
  }
  get_Hunman() {
    let Hunman = this._user.getUserByType('HUMAN')
    return Hunman
  }
  //---------------------Read_Ultrasonic_Sensor------------------------------
  checkDatabase_for_check(address) {
    this._user.checkUser = this._user.getUserByAddress(address);
    this.check_NoHD = this.get_NoHDByAddress(address);
    this.checkNo = this.getNoByAddress(address);

    if (this.checkNo.type == 'NO') {
      return true;
    }
    else if (this.check_NoHD.type == 'NO_H_M') {
      return true;
    }
    else if (this._user.checkUser.type == 'HUMAN') {
      return true;
    }
    else {
      throw `HUMAN_AND_QS IS NOT EXIST`;
    }
  }
  async Process() {
    this.checkDatabase_for_check(this.sender, 'HUMAN_AND_QS')
    let Read_Ultrasonic_Sensor = await this._process.createProcess('PROCESS')
    return Read_Ultrasonic_Sensor
  }
  async Read_Ultrasonic_Sensor(address_Process) {
    this._user.checkUser(this.sender, 'HUMAN')
    let check_Process = this._process.getProcessByAddress(address_Process)
    if (!check_Process || check_Process.type !== 'PROCESS')
      throw 'PROCESS IS NOT EXIST'
    let capture = await this._process.createProcess('READ_ULTRASONIC_SENSOR')
    return capture
  }
  get_Read_Ultrasonic_Sensor() {
    return this._process.getProcessByType('READ_ULTRASONIC_SENSOR')
  }

  //---------------------Human_Detected------------------------------
  async Human_Detected(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2].includes(Number(type))) throw 'CREATE QS FAIL'
    await this._process.checkProcess(this.sender)
    let qs = await this._qs.createQS(type - 1, this.sender)
    this.setToAddress(qs.address)
    return qs
  }
  async getYesHD() {
    await this._process.checkPocess(this.sender)
    return this._qs.getQSByType('YES_H_M', this.sender)
  }
  check_getNoHDAddress(address) {
    let check_getNoHDAddress = this.getgetNoHDByAddress(address)
    if (!check_getNoHDAddress || check_getNoHDAddress.type !== 'NO_H_M') throw `NO_H_M IS NOT EXIST`
    return true
  }
  getgetNoHDByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async getNoHD() {
    await this._process.checkPocess(this.sender)
    return this._qs.getQSByType('NO_H_M', this.sender)
  }
  //---------------------Capture_Face_Image------------------------------
  async Capture_Face_Image(address_API) {
    this._user.checkUser(this.sender, 'HUMAN')
    let check_get_Yes = this._process.getProcessByAddress(address_API)
    if (!check_get_Yes || check_get_Yes.type !== 'YES_H_M')
      throw 'YES_H_M IS NOT EXIST'
    let capture = await this._process.createProcess('CAPTURE_FACE_IMAGE')
    return capture
  }
  get_Capture_Face_Image() {
    return this._process.getProcessByType('CAPTURE_FACE_IMAGE')
  }
  //---------------------Capture_Face_Image------------------------------
  async Face_Detection(address_API) {
    this._user.checkUser(this.sender, 'HUMAN')
    let check_Capture_Face_Image = this._process.getProcessByAddress(address_API)
    if (!check_Capture_Face_Image || check_Capture_Face_Image.type !== 'CAPTURE_FACE_IMAGE')
      throw 'CAPTURE_FACE_IMAGE IS NOT EXIST'
    let detection = await this._process.createProcess('FACE_DETECTION')
    return detection
  }
  get_Face_Detection() {
    return this._process.getProcessByType('FACE_DETECTION')
  }
  //---------------------Face_Recognition------------------------------

  async Face_Recognition(address_API) {
    this._user.checkUser(this.sender, 'HUMAN')
    let check_Capture_Face_Image = this._process.getProcessByAddress(address_API)
    if (!check_Capture_Face_Image || check_Capture_Face_Image.type !== 'CAPTURE_FACE_IMAGE')
      throw 'CAPTURE_FACE_IMAGE IS NOT EXIST'
    let Face_Recognition = await this._process.createProcess('FACE_RECOGNITION')
    return Face_Recognition
  }
  get_Face_Recognition() {
    return this._process.getProcessByType('FACE_RECOGNITION')
  }
  //---------------------Recognized_Face------------------------------
  async Recognized_Face(type) {
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
  check_getNoAddress(address) {
    let check_getNoAddress = this.getgetNoByAddress(address)
    if (!check_getNoAddress || check_getNoAddress.type !== 'NO') throw `NO IS NOT EXIST`
    return true
  }
  getgetNoByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async getNo() {
    await this._process.checkPocess(this.sender)
    return this._qs.getQSByType('NO', this.sender)
  }
  //---------------------Door_Unlock------------------------------
  async Door_Unlock(address_API) {
    this._user.checkUser(this.sender, 'HUMAN')
    let check_get_Yes = this._process.getProcessByAddress(address_API)
    if (!check_get_Yes || check_get_Yes.type !== 'YES')
      throw 'NO IS NOT EXIST'
    let Door_Unlock = await this._process.createProcess('DOOR_UNLOCK')
    return Door_Unlock
  }
  get_Door_Unlock() {
    return this._process.getProcessByType('DOOR_UNLOCK')
  }
  //---------------------Wait_for_30_second------------------------------
  async Wait_for_30_second(address_API) {
    this._user.checkUser(this.sender, 'HUMAN')
    let check_Door_Unlock = this._process.getProcessByAddress(address_API)
    if (!check_Door_Unlock || check_Door_Unlock.type !== 'YES')
      throw 'NO IS NOT EXIST'
    let wait = await this._process.createProcess('WAIT_FOR_30_SECOND')
    return wait
  }
  get_Wait_for_30_second() {
    return this._process.getProcessByType('WAIT_FOR_30_SECOND')
  }
  //---------------------Door_Lock------------------------------
  async Door_Lock(address_API) {
    this._user.checkUser(this.sender, 'HUMAN')
    let check_Wait_for_30_second = this._process.getProcessByAddress(address_API)
    if (!check_Wait_for_30_second || check_Wait_for_30_second.type !== 'WAIT_FOR_30_SECOND')
      throw 'WAIT_FOR_30_SECOND IS NOT EXIST'
    let wait = await this._process.createProcess('DOOR_LOCK')
    return wait
  }
  get_Door_Lock() {
    return this._process.getProcessByType('DOOR_LOCK')
  }
}
export default TokenMain 
