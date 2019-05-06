import HashTable from '../HashTable/HashTable'

export default class TrieNode {
  public character: string
  public isCompleteWord: boolean
  public children: HashTable<TrieNode>

  /**
   * Creates an instance of TrieNode.
   * 
   * @param {string} character
   * @param {boolean} [isCompleteWord=false]
   * @memberof TrieNode
   */
  public constructor(character: string, isCompleteWord: boolean = false) {
    this.character = character
    this.isCompleteWord = isCompleteWord
    this.children = new HashTable()
  }

  /**
   * get child by character
   *
   * @param {string} character
   * @returns
   * @memberof TrieNode
   */
  public getChild(character: string) {
    return this.children.get(character)
  }

  /**
   * add child
   *
   * @param {string} character
   * @param {boolean} [isCompleteWord=false]
   * @returns
   * @memberof TrieNode
   */
  public addChild(character: string, isCompleteWord: boolean = false) {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord))
    }

    const childNode = this.children.get(character)

    // In case similar to adding "car" after "carpet" we need to mark "r" character as complete
    childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord

    return childNode
  }

  /**
   * remove child by character
   *
   * @param {string} character
   * @returns
   * @memberof TrieNode
   */
  public removeChild(character: string) {
    const childNode = this.getChild(character)

    // Delete childNode only if:
    // - childNode has no children
    // - childNode.isCompleteWord === false
    if (childNode && !childNode.isCompleteWord && !childNode.hasChildren()) {
      this.children.delete(character)
    }

    return this
  }

  /**
   * has child of character
   *
   * @param {string} character
   * @returns
   * @memberof TrieNode
   */
  public hasChild(character: string) {
    return this.children.has(character)
  }

  /**
   * has children
   *
   * @returns
   * @memberof TrieNode
   */
  public hasChildren() {
    return this.children.getKeys().length !== 0
  }

  /**
   * suggest children
   *
   * @returns
   * @memberof TrieNode
   */
  public suggestChildren() {
    return [...this.children.getKeys()]
  }

  /**
   * to string
   *
   * @returns
   * @memberof TrieNode
   */
  public toString() {
    let childrenAsString = this.suggestChildren().toString()

    childrenAsString = childrenAsString ? `:${childrenAsString}` : ''

    const isCompleteString = this.isCompleteWord ? '*' : ''

    return `${this.character}${isCompleteString}${childrenAsString}`
  }
}