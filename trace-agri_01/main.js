import Contract from 'Contract'
import Tree from './tree'
import Fruit from './fruit'
import Box from './box'
import Store from './store'
class TokenMain extends Contract {
  static viewFuncs = [
    'getTreeByAddress',
    'getTrees',
    'getTreeByAddress',
    'getFruitByAddress',
    'getBoxByAddress',
    'getStoreByAddress',
    'getTrees',
    'getFruits',
    'getBoxes',
    'getStores',
    'getAll'
  ]
  static authenticationFuncs = [
    'createTree',
    'createFruit',
    'createBox',
    'createStore'
  ]
  static publicFuncs = [
    'getTreeByAddress',
    'getFruitByAddress',
    'getBoxByAddress',
    'getStoreByAddress',
    'getTrees',
    'getFruits',
    'getBoxes',
    'getStores',
    'createTree',
    'createFruit',
    'createBox',
    'createStore',
    'getAll'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'CSE'
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
    this._tree = new Tree(data)
    this._fruit = new Fruit(data)
    this._box = new Box(data)
    this._store = new Store(data)
  }
  // --------------------TREE---------------------------
  async createTree() {
    let tree = await this._tree.createTree()
    return tree
  }
  getTreeByAddress(address) {
    let tree = this._tree.getTreeByAddress(address)
    if (!tree) throw 'CANNOT_FIND_TREE'
    else return tree
  }
  getTrees() {
    let lists = this._tree.getTrees()
    return lists
  }
  // ---------------------FRUIT---------------------------
  async createFruit() {
    let fruit = await this._fruit.createFruit()
    return fruit
  }
  getFruitByAddress(address) {
    let fruit = this._fruit.getFruitByAddress(address)
    if (!fruit) throw 'CANNOT_FIND_TREE'
    else return fruit
  }
  getFruits() {
    let lists = this._fruit.getFruits()
    return lists
  }
  // ---------------------BOX---------------------------
  async createBox() {
    let fruit = await this._box.createBox()
    return fruit
  }
  getBoxByAddress(address) {
    let fruit = this._box.getBoxByAddress(address)
    if (!fruit) throw 'CANNOT_FIND_TREE'
    else return fruit
  }
  getFruits() {
    let lists = this._box.getBoxes()
    return lists
  }
  // ---------------------STORE---------------------------
  async createStore() {
    let fruit = await this._store.createStore()
    return fruit
  }
  getStoreByAddress(address) {
    let fruit = this._store.getStoreByAddress(address)
    if (!fruit) throw 'CANNOT_FIND_TREE'
    else return fruit
  }
  getStores() {
    let lists = this._store.getStores()
    return lists
  }
  // --------------------OTHER-----------------------
  getAll() {
    let trees = this._tree.getTrees()
    let fruits = this._fruit.getFruits()
    let boxes = this._box.getBoxes()
    let stores = this._store.getStores()
    return [{ trees, fruits, boxes, stores }]
  }
}
export default TokenMain
