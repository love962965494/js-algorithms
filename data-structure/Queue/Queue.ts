import LinkedList from '../LinkedList/LinkedList'

export default class Queue {
  public linkedList: LinkedList

  /**
   * Creates an instance of Queue.
   *
   * @memberof Queue
   */
  constructor() {
    // we're going to implement Queue based on LinkedList since the two
    // structures are quite similar. Namely, they both operate mostly on
    // the elements at the beginning and the end. Compare enqueue/dequeue
    // operations of Queue with append/deleteHead operations of LinkedList.
    this.linkedList = new LinkedList()
  }

  /**
   * find queue is empty
   *
   * @returns {boolean}
   * @memberof Queue
   */
  public isEmpty(): boolean {
    return !this.linkedList.head
  }

  /**
   * get head value, if head not exists, return nulll
   *
   * @returns
   * @memberof Queue
   */
  public peek() {
    if (!this.linkedList.head) {
      return null
    }

    return this.linkedList.head.value
  }

  /**
   * add a new element to the end of the queue (the tail of the linked list),
   * this element will be processed after all elements ahead of it.
   *
   * @param {*} value
   * @memberof Queue
   */
  public enqueue(value) {
    this.linkedList.append(value)
  }

  /**
   * remove the element at the front of the queue (the head of the linked list).
   * If the queue is empty, return null
   *
   * @returns
   * @memberof Queue
   */
  public dequeue() {
    const removedHead = this.linkedList.deleteHead()

    return removedHead || null
  }

  /**
   * to string
   *
   * @param {(value: any) => string} [callback]
   * @returns
   * @memberof Queue
   */
  public toString(callback?: (value: any) => string) {
    return this.linkedList.toString(callback)
  }
}
