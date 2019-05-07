import TrieNode from './TrieNode'

// Character that we will use for trie tree root
const HEAD_CHARACTER = '*'

export default class Trie {
  public head: TrieNode

  /**
   * Creates an instance of Trie.
   * 
   * @memberof Trie
   */
  public constructor() {
    this.head = new TrieNode(HEAD_CHARACTER)
  }

  /**
   * add word
   *
   * @param {string} word
   * @returns
   * @memberof Trie
   */
  public addWord(word: string) {
    const characters =  Array.from(word)
    let currentNode = this.head

    for (const [index, character] of characters.entries()) {
      const isComplete = index === characters.length - 1
      
      currentNode = currentNode.addChild(character, isComplete)
    }

    return this
  }

  /**
   * delete word
   *
   * @param {string} word
   * @returns
   * @memberof Trie
   */
  public deleteWord(word: string) {
    const depthFirstDelete = (currentNode: TrieNode, charIndex: number = 0) => {
      if (charIndex > word.length) {
        // Return if we're trying to delete the character that is out of word's scope
        return
      }

      const character = word[charIndex]
      const nextNode = currentNode.getChild(character)

      if (nextNode === null) {
        // Return if we're trying to delete a word that has not been added to the Trie
        return
      }

      // Go deeper
      depthFirstDelete(nextNode, charIndex + 1)

      // Since we're going to delete a word let's un-mark its last character isCompleteWord flag
      if (charIndex === (word.length - 1)) {
        nextNode.isCompleteWord = false
      }

      // childNode is deleted only if:
      // - childnode has no children
      // - childNode.isCompleteWord === false
      currentNode.removeChild(character)
    }

    // Start depth first deletion from the head node
    depthFirstDelete(this.head)

    return this
  }

  /**
   * suggest next characters
   *
   * @param {*} word
   * @returns
   * @memberof Trie
   */
  public suggestNextCharacters(word) {
    const lastCharacter = this.getLastCharacterNode(word)

    if (!lastCharacter) {
      return null
    }

    return lastCharacter.suggestChildren()
  }

  /**
   * does word exist
   *
   * @param {string} word
   * @returns
   * @memberof Trie
   */
  public doesWordExist(word: string) {
    const lastCharacter = this.getLastCharacterNode(word)

    return !!lastCharacter && lastCharacter.isCompleteWord
  }

  /**
   * get last character node
   *
   * @param {string} word
   * @returns
   * @memberof Trie
   */
  public getLastCharacterNode(word: string) {
    const characters = Array.from(word)
    let currentNode = this.head

    for (const character of characters) {
      if (!currentNode.hasChild(character)) {
        return null
      }

      currentNode = currentNode.getChild(character)
    }

    return currentNode
  }
}