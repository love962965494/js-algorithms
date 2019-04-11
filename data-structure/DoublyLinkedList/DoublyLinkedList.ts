import DoublyLinkedListNode from './DoublyLinkedListNode'
import Comparator, { ICompareFunction } from '../../utils/Comparator/Comparator'

export default class DoublyLinkedList {
  public head: DoublyLinkedListNode
  public tail: DoublyLinkedListNode
  public compare: Comparator

  constructor(comparatorFunction: ICompareFunction) {
    this.head = null
    this.tail = null
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   * prepend a DoublyLinkedListNode to the DoublyLinkedList
   *
   * @param {*} value
   * @returns
   * @memberof DoublyLinkedList
   */
  public prepend(value: any) {
    // make new node to be a head
    const newNode = new DoublyLinkedListNode(value)

    // if there is head, then it won't be head anymore
    // therefore, make its previous reference to be new node (new head)
    // then mrk the new node as head
    if (this.head) {
      this.head.previous = newNode
    }

    this.head = newNode

    // if there if no tail yet let's make new node a tail
    if (!this.tail) {
      this.tail = newNode
    }

    return this
  }

  /**
   * append a DoublyLinkedListNode to the DoublyLinkedList
   *
   * @param {*} value
   * @returns
   * @memberof DoublyLinkedList
   */
  public append(value: any) {
    const newNode = new DoublyLinkedListNode(value)

    // if there is no head yet let's make new node a head
    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }

    // attach new node to the end of the DoublyLinkedList
    this.tail.next = newNode

    // attach current tail to the new node's previous reference
    newNode.previous = this.tail

    // set new node to be the tail of the DoublyLinkedList
    this.tail = newNode

    return this
  }

  /**
   * delete DoublyLinkedListNode from DoublyLinkedList whose value equals passed value
   * and return the deletedNode
   *
   * @param {*} value
   * @returns
   * @memberof DoublyLinkedList
   */
  public delete(value: any) {
    if (!this.head) {
      return null
    }

    let deletedNode = null
    let currentNode = this.head

    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        deletedNode = currentNode

        if (deletedNode === this.head) {
          // if head is going to be deleted
          // set head to second node, which will become new head
          this.head = deletedNode.next

          // set new head's previous to null
          if (this.head) {
            this.head.previous = null
          }

          // if all the nodes in list has same value that is passed as argument
          // then all nodes will get deleted, therefore tail needs to be updated
          if (deletedNode === this.tail) {
            this.tail = null
          }
        } else if (deletedNode === this.tail) {
          // if tail is going to be deleted
          // set tail to second last node, which will become new tail
          this.tail = deletedNode.previous
          this.tail.next = null
        } else {
          // if middle node is going to be deleted
          const previousNode = deletedNode.previous
          const nextNode = deletedNode.next

          previousNode.next = nextNode
          nextNode.previous = previousNode
        }
      }

      currentNode = currentNode.next
    }

    return deletedNode
  }

  /**
   * find DoublyLinkedListNode from DoublyLinkedList
   * return finded node, or null
   *
   * @param {*} [value]
   * @param {(value: any) => boolean} [callback]
   * @returns
   * @memberof DoublyLinkedList
   */
  public find(value?: any, callback?: (value: any) => boolean ) {
    if (!this.head) {
      return null
    }

    let currentNode = this.head

    while (currentNode) {
      // if callback is specified then try to find node by callback
      if (callback && callback(currentNode.value)) {
        return currentNode
      }

      // if value is specified then try to compare by value
      if (value && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  /**
   * delete tail from DoublyLinkedList
   * return delted tail
   *
   * @returns
   * @memberof DoublyLinkedList
   */
  public deleteTail() {
    if (!this.tail) {
      return null
    }

    let deletedTail

    if (this.head === this.tail) {
      // there is only one node in linked list
      deletedTail = this.tail
      
      this.head = null
      this.tail = null
      
      return deletedTail
    }

    // if there are many nodes in DoublyLinkedList
    deletedTail = this.tail
    
    this.tail = this.tail.previous
    this.tail.next = null

    return deletedTail
  }

  /**
   * delete head from DoublyLinkedList
   * return deleted head
   *
   * @returns
   * @memberof DoublyLinkedList
   */
  public deleteHead() {
    if (this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
      this.head.previous = null
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  /**
   * convert DoublyLinkedList to array
   *
   * @returns
   * @memberof DoublyLinkedList
   */
  public toArray() {
    const nodes: DoublyLinkedListNode[] = []

    let currentNode = this.head

    while (currentNode) {
      nodes.push(currentNode)

      currentNode = currentNode.next
    }

    return nodes
  }

  /**
   * convert values to DoublyLinkedList
   *
   * @param {any[]} values
   * @returns
   * @memberof DoublyLinkedList
   */
  public fromArray(values: any[]) {
    values.forEach(value => this.append(value))

    return this
  }

  /**
   * convert DoublyLinkedList to string
   *
   * @param {(value: any) => string} callback
   * @returns
   * @memberof DoublyLinkedList
   */
  public toString(callback: (value: any) => string) {
    return this.toArray().map(node => node.toString(callback)).toString()
  }

  /**
   * reverse DoublyLinkedList
   *
   * @returns
   * @memberof DoublyLinkedList
   */
  public reverse() {
    let currentNode = this.head
    let previousNode = null
    let nextNode = null

    while (currentNode) {
      // store next node
      nextNode = currentNode.next
      previousNode = currentNode.previous

      // change next node of the current so it would link to previous node
      currentNode.next = previousNode
      currentNode.previous = nextNode

      // move previousNode and currentNode one step forward
      previousNode = currentNode
      currentNode = nextNode
    }

    // reset head and tail
    this.tail = this.head
    this.head = previousNode

    return this
  }
}