import Heap from './Heap'

export default class MaxHeap<T> extends Heap<T> {
  /**
   * Checks if pair of elements is in correct order.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {T} firstElement
   * @param {T} secondElement
   * @returns
   * @memberof MaxHeap
   */
  public pairsInCorrectOrder(firstElement: T, secondElement: T) {
    return this.compare.greaterThanOrEqual(firstElement, secondElement)
  }
}
