import LinkedList from '../LinkedList/LinkedList'

export default class Stack {
  public linkedList: LinkedList

  public constructor() {
    this.linkedList = new LinkedList()
  }

  /**
   * ths stack is empty
   *
   * @returns
   * @memberof Stack
   */
  public isEmpty() {
    // the stack is empty if its linked list doesn't have a head
    return !this.linkedList.head
  }

  /**
   * get the head value of linked list if exist
   *
   * @returns
   * @memberof Stack
   */
  public peek() {
    if (this.isEmpty()) {
      // if the linked list is empty then there is nothing to peek from
      return null
    }

    // just reat the value from the start of linked list without deletig it
    return this.linkedList.head.value
  }

  /**
   * pop
   *
   * @returns
   * @memberof Stack
   */
  public pop() {
    // let's try to delete the first node (the head) from the linked list.
    // if there is no head (the linked list is empty) just return null.
    const removedHead = this.linkedList.deleteHead()

    return removedHead ? removedHead.value : null
  }

  /**
   * push
   *
   * @param {*} value
   * @memberof Stack
   */
  public push(value: any) {
    // pushing means to lay the value on top of the stack. Therefore let's just 
    // add the new value at the start of the linked list.
    this.linkedList.prepend(value)
  }

  /**
   * to array
   *
   * @returns
   * @memberof Stack
   */
  public toArray() {
    return this.linkedList.toArray().map(linkedListNode => linkedListNode.value)
  }

  /**
   * to string
   *
   * @param {(value: any) => string} [callback]
   * @returns
   * @memberof Stack
   */
  public toString(callback?: (value: any) => string) {
    return this.linkedList.toString(callback)
  }
}