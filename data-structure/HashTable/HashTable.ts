import LinkedList from '../LinkedList/LinkedList'

// Hash table size directly affets on the number of collisions
// The bigger the hash table size the less collision you'll get.
// For demonstrating purpose hash table size is small to show how collisions
// are being handled.
const defaultHashTableSize = 32

export default class hashTable {
  public buckets: LinkedList[]
  public keys: { [key: string]: any }

  /**
   * Creates an instance of hashTable.
   *
   * @param {number} [hashTableSize=defaultHashTableSize]
   * @memberof hashTable
   */
  public constructor(hashTableSize: number = defaultHashTableSize) {
    // Create hash table of certain size and fill each bucket with empty linked list
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList())
    this.keys = {}
  }

  /**
   * convert key string to hash
   *
   * @param {string} key
   * @returns
   * @memberof hashTable
   */
  public hash(key: string) {
    // For simplicity reasons we will just use character codes sum of all characters of the key
    // to calculate the hash.

    // But you may also use more sophisticated approaches like polynominal string hash to reduce the
    // number of collisions.

    // hash = charCodeAt(0) * PRIME ^ (n - 1) + charCodeAt(1) * PRIME ^ (n - 2) + ... + charCodeAt(n - 1)
    //
    // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
    // PRIME is just any prime number like 31
    const hash = Array.from(key).reduce((hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0), 0)

    // Reduce hash numbers so it would fit hash table size
    return hash % this.buckets.length
  }

  /**
   * set key value
   *
   * @param {string} key
   * @param {*} value
   * @memberof hashTable
   */
  public set(key: string, value: any) {
    const keyHash = this.hash(key)

    this.keys[key] = keyHash

    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })

    if (!node) {
      // insert new node
      bucketLinkedList.append({ key, value })
    } else {
      // update value of existing node
      node.value.value = value
    }
  }

  /**
   * delete node by key
   *
   * @param {string} key
   * @returns
   * @memberof hashTable
   */
  public delete(key: string) {
    const keyHash = this.hash(key)

    delete this.keys[key]

    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key })

    if (node) {
      return bucketLinkedList.delete(node.value)
    }

    return null
  }

  /**
   * does hashTable have node
   *
   * @param {string} key
   * @returns
   * @memberof hashTable
   */
  public has(key: string) {
    return Object.hasOwnProperty.call(this.keys, key)
  }

  /**
   * return keys
   *
   * @returns
   * @memberof hashTable
   */
  public getKeys() {
    return Object.keys(this.keys)
  }
}
