export default class DoublyLinkedListNode {
  public value: any
  public next: DoublyLinkedListNode
  public previous: DoublyLinkedListNode

  /**
   * Creates an instance of DoublyLinkedListNode.
   * 
   * @param {*} value
   * @param {DoublyLinkedListNode} [next=null]
   * @param {DoublyLinkedListNode} [previous=null]
   * @memberof DoublyLinkedListNode
   */
  constructor(value: any, next: DoublyLinkedListNode = null, previous: DoublyLinkedListNode = null) {
    this.value = value
    this.next = next
    this.previous = previous
  }

  /**
   * to string
   *
   * @param {(value: any) => string} [callback]
   * @returns
   * @memberof DoublyLinkedListNode
   */
  toString(callback?: (value: any) => string) {
    return callback ? callback(this.value) : `${this.value}`
  }
}
