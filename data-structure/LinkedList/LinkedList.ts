import LinkedListNode from './LinkedListNode'
import Comparator, { ICompareFunction } from '../../utils/Comparator/Comparator'

export default class LinkedList<T> {
  public head: LinkedListNode<T>
  public tail: LinkedListNode<T>
  public compare: Comparator

  /**
   * Creates an instance of LinkedList.
   *
   * @param {ICompareFunction} comparatorFunction
   * @memberof LinkedList
   */
  constructor(comparatorFunction?: ICompareFunction) {
    this.head = null
    this.tail = null
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   * prepend a LinkedListNode to the LinkedList
   *
   * @param {T} value
   * @returns
   * @memberof LinkedList
   */
  public prepend(value: T) {
    const newNode = new LinkedListNode(value, this.head)

    this.head = newNode

    // if there is no tail yet let's make new node a tail
    if (!this.tail) {
      this.tail = newNode
    }

    return this
  }

  /**
   * append a LinkedListNode to the LinkedList
   *
   * @param {T} value
   * @returns
   * @memberof LinkedList
   */
  public append(value: T) {
    const newNode = new LinkedListNode<T>(value)

    // if there is no head yet let's make new node a head
    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }

    // attach new node to the end of the linked list
    this.tail.next = newNode
    this.tail = newNode

    return this
  }

  /**
   * delete LinkedListNode from LinkedList whose value equals imported value,
   * and return the deltedNode, else return null
   *
   * @param {T} value
   * @returns
   * @memberof LinkedList
   */
  public delete(value: T) {
    if (!this.head) {
      return null
    }

    let deleteNode = null

    // if the head must be deleted then make next node that is differ
    // from the head to be a new head
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head
      this.head = this.head.next
    }

    let currentNode = this.head

    if (currentNode !== null) {
      // if next node must be deleted then make next node to be a next next one
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    // check if tail must be deleted
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode
    }

    return deleteNode
  }

  /**
   * find LinkedListNode from LinkedList
   *
   * @param {{ value: T; callback: (value: T) => boolean }} { value = undefined, callback = undefined }
   * @returns
   * @memberof LinkedList
   */
  public find({ value = undefined, callback = undefined }: { value?: T; callback?: (value: T) => boolean }) {
    if (!this.head) {
      return null
    }

    let currentNode = this.head

    while (currentNode) {
      // if callback is specified then try to find node by callback
      if (callback && callback(currentNode.value)) {
        return currentNode
      }

      // if value is specified then try to compare node by value
      if (value && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  /**
   * delete tail form LinkedList
   *
   * @returns
   * @memberof LinkedList
   */
  public deleteTail() {
    const deletedTail = this.tail

    if (this.head === this.tail) {
      // there is noly one node in the linked list
      this.head = null
      this.tail = null

      return deletedTail
    }

    // if there are many nodes in linked list

    // rewind to the last node and delete "next" link for the node before the last one
    let currentNode = this.head

    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }

    this.tail = currentNode

    return deletedTail
  }

  /**
   * delete head from LinkedList
   *
   * @returns
   * @memberof LinkedList
   */
  public deleteHead() {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  /**
   * array of values that need to be converted to linked list
   *
   * @param {T[]} values
   * @returns
   * @memberof LinkedList
   */
  public fromArray(values: T[]) {
    values.forEach((value) => this.append(value))

    return this
  }

  /**
   * convert LinkedList to array
   *
   * @returns
   * @memberof LinkedList
   */
  public toArray() {
    const nodes: LinkedListNode<T>[] = []

    let currentNode = this.head

    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  /**
   * convert LinkedList to string
   *
   * @param {(value: T) => string} [callback]
   * @returns
   * @memberof LinkedList
   */
  public toString(callback?: (value: T) => string) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString()
  }

  /**
   * reverse LinkedList
   *
   * @returns
   * @memberof LinkedList
   */
  public reverse() {
    let currentNode = this.head
    let prevNode = null
    let nextNode = null

    while (currentNode) {
      // store next node
      nextNode = currentNode.next

      // change next node of the current node so it would link to previous node
      currentNode.next = prevNode

      // move prevNode and currentNode one step forward
      prevNode = currentNode
      currentNode = nextNode
    }

    this.tail = this.head
    this.head = prevNode

    return this
  }
}
