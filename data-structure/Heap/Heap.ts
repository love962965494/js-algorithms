import Comparator, { ICompareFunction } from '../../utils/Comparator/Comparator'

export default class Heap<T> {
  public heapCotainer: T[] = []
  public compare: Comparator

  /**
   * Creates an instance of Heap.
   *
   * @param {ICompareFunction} comparatorFunction
   * @memberof Heap
   */
  public constructor(comparatorFunction?: ICompareFunction) {
    if (new.target === Heap) {
      throw new TypeError('Cannot construct Heap instance directly')
    }

    // Array reprensentation of the heap
    this.heapCotainer = []
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   * get left child index
   *
   * @param {number} parentIndex
   * @returns {number}
   * @memberof Heap
   */
  public getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1
  }

  /**
   * get right child index
   *
   * @param {number} parentIndex
   * @returns {number}
   * @memberof Heap
   */
  public getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2
  }

  /**
   * get parent index
   *
   * @param {number} childIndex
   * @returns {number}
   * @memberof Heap
   */
  public getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2)
  }

  /**
   * does current child has parent
   *
   * @param {number} childIndex
   * @returns {boolean}
   * @memberof Heap
   */
  public hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0
  }

  /**
   * does current parent has left child
   *
   * @param {number} parentIndex
   * @returns {boolean}
   * @memberof Heap
   */
  public hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.heapCotainer.length
  }

  /**
   * does curretn parent has right child
   *
   * @param {number} parentIndex
   * @returns {boolean}
   * @memberof Heap
   */
  public hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heapCotainer.length
  }

  /**
   * get left child
   *
   * @param {number} parentIndex
   * @returns {T}
   * @memberof Heap
   */
  public leftChild(parentIndex: number): T {
    return this.heapCotainer[this.getLeftChildIndex(parentIndex)]
  }

  /**
   * get right child
   *
   * @param {number} parentIndex
   * @returns {T}
   * @memberof Heap
   */
  public rightChild(parentIndex: number): T {
    return this.heapCotainer[this.getRightChildIndex(parentIndex)]
  }

  /**
   * get parent
   *
   * @param {number} childIndex
   * @returns {T}
   * @memberof Heap
   */
  public parent(childIndex: number): T {
    return this.heapCotainer[this.getParentIndex(childIndex)]
  }

  /**
   * swap two items
   *
   * @param {number} indexOne
   * @param {number} indexTwo
   * @memberof Heap
   */
  public swap(indexOne: number, indexTwo: number): void {
    ;[this.heapCotainer[indexOne], this.heapCotainer[indexTwo]] = [
      this.heapCotainer[indexTwo],
      this.heapCotainer[indexOne]
    ]
  }

  /**
   * heapify up
   *
   * @param {number} [customStartIndex]
   * @memberof Heap
   */
  public heapifyUp(customStartIndex?: number) {
    // Take the last element (last in array or the bottom left in a tree)
    // in the heap container and lift it up until it is in the correct
    // order with respect to its parent element.
    let currentIndex = customStartIndex || this.heapCotainer.length - 1

    while (
      this.hasParent(currentIndex) &&
      !this.pairsInCorrectOrder(this.parent(currentIndex), this.heapCotainer[currentIndex])
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex))
      currentIndex = this.getParentIndex(currentIndex)
    }
  }

  public heapifyDown(customStartIndex: number = 0) {
    // Compare the parent element to its children and swap parent with the appropriate
    // child (smallest child for MinHeap, largest child for MaxHeap).
    // Do the same for next children after swap
    let currentIndex = customStartIndex
    let nextIndex = null

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex)
      }

      if (this.pairsInCorrectOrder(this.heapCotainer[currentIndex], this.heapCotainer[nextIndex])) {
        break
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
  }

  /**
   * get the root element
   *
   * @returns {(T | null)}
   * @memberof Heap
   */
  public peek(): T | null {
    if (this.heapCotainer.length === 0) {
      return null
    }

    return this.heapCotainer[0]
  }

  /**
   * get the last element
   *
   * @returns {(T | null)}
   * @memberof Heap
   */
  public poll(): T | null {
    if (this.heapCotainer.length === 0) {
      return null
    }

    if (this.heapCotainer.length === 1) {
      return this.heapCotainer.pop()
    }

    const item = this.heapCotainer[0]

    // Move the last element from the end to the head
    this.heapCotainer[0] = this.heapCotainer.pop()
    this.heapifyDown()

    return item
  }

  /**
   * find items in heap which equals to the parameter "item"
   *
   * @param {T} item
   * @param {Comparator} [comparator=this.compare]
   * @returns {T[]}
   * @memberof Heap
   */
  public find(item: T, comparator: Comparator = this.compare): number[] {
    const foundItemIndices: number[] = []

    for (const [index, heapItem] of this.heapCotainer.entries()) {
      if (comparator.equal(item, heapItem)) {
        foundItemIndices.push(index)
      }
    }

    return foundItemIndices
  }

  /**
   * add item to the heap
   *
   * @param {T} item
   * @returns {Heap<T>}
   * @memberof Heap
   */
  public add(item: T) {
    this.heapCotainer.push(item)
    this.heapifyUp()

    return this
  }

  /**
   * remove items from heap whice equals to the parameter "item"
   *
   * @param {T} item
   * @param {Comparator} [comparator=this.compare]
   * @returns {Heap<T>}
   * @memberof Heap
   */
  public remove(item: T, comparator: Comparator = this.compare): Heap<T> {
    // Find number of items to remove
    let numberOfItemsToRemove = this.find(item, comparator).length

    while (numberOfItemsToRemove) {
      // We need to find item index to remove each time after removal since
      // indices are being changed after each heapify process
      const indexToRemove = this.find(item, comparator).pop()

      // If we need to remove last child in the heap then just remove it.
      // There is no need to heapify the heap afterwards.
      if (indexToRemove === this.heapCotainer.length - 1) {
        this.heapCotainer.pop()
      } else {
        // Move last element in heap to the vacant (removed) position
        this.heapCotainer[indexToRemove] = this.heapCotainer.pop()

        // get parent
        const parentItem = this.parent(indexToRemove)

        // if there is no parent or parent is in correct order with the node
        // we're going to delete then heapify down. Otherwise heapify up.
        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem || this.pairsInCorrectOrder(parentItem, this.heapCotainer[indexToRemove]))
        ) {
          this.heapifyDown(indexToRemove)
        } else {
          this.heapifyUp(indexToRemove)
        }
      }

      numberOfItemsToRemove--
    }

    return this
  }

  /**
   * heap is empty
   *
   * @returns {boolean}
   * @memberof Heap
   */
  public isEmpty(): boolean {
    return !this.heapCotainer.length
  }

  /**
   * to string
   *
   * @returns {string}
   * @memberof Heap
   */
  public toString(): string {
    return this.heapCotainer.toString()
  }

  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {T} firstElement
   * @param {T} secondeElement
   * @memberof Heap
   */
  public pairsInCorrectOrder(firstElement: T, secondeElement: T): boolean {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondeElement} values.
    `)
  }
}
