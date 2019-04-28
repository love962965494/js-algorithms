import Heap from './Heap'

export default class MinHeap<T> extends Heap<T> {
  /**
   * Checks if pair of heap element is in correct order.
   * For MinHeap the first element must be always lesser or equal.
   *
   * @param {T} firstElement
   * @param {T} secondElement
   * @returns
   * @memberof MinHeap
   */
  public pairsInCorrectOrder(firstElement: T, secondElement: T) {
    return this.compare.lessThanOrEqual(firstElement, secondElement)
  }
}
