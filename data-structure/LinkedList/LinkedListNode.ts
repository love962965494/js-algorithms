export default class LinkedListNode { 
  public value: any
  public next: LinkedListNode

  /**
   * Creates an instance of LinkedListNode.
   * 
   * @param {*} value
   * @param {LinkedListNode} [next=null]
   * @memberof LinkedListNode
   */
  constructor(value: any, next: LinkedListNode = null) {
    this.value = value
    this.next = next
  }

  /**
   * let value to string
   *
   * @param {(value: any) => string} [callback]
   * @returns
   * @memberof LinkedListNode
   */
  public toString(callback?: (value: any) => string) {
    return callback ? callback(this.value) : `${this.value}`
  }
}