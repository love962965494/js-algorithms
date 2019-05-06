export default class LinkedListNode<T> { 
  public value: T
  public next: LinkedListNode<T>

  /**
   * Creates an instance of LinkedListNode.
   * 
   * @param {*} value
   * @param {LinkedListNode} [next=null]
   * @memberof LinkedListNode
   */
  constructor(value: any, next: LinkedListNode<T> = null) {
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