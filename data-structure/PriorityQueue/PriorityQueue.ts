import MinHeap from '../Heap/MinHeap'
import Comparator, { ICompareFunction } from '../../utils/Comparator/Comparator'

// It is the same as min heap except that when compare two elements
// we take into account its priority instead of the element's value
export default class PriorityQueue<T> extends MinHeap<T> {
  public priorities: Map<T, number>
  public compare: Comparator

  /**
   * Creates an instance of PriorityQueue.
   * 
   * @memberof PriorityQueue
   */
  public constructor() {
    // Call MinHeap construcotr first
    super()

    // Setup priorities map
    this.priorities = new Map()

    // Use custom comparator for heap elements that will take element priority
    // instaead of element value into account
    this.compare = new Comparator(this.comparePriority.bind(this))
  }

  /**
   * add item to the priority queue
   *
   * @param {T} item
   * @param {number} [priority=0]
   * @memberof PriorityQueue
   */
  public add(item: T, priority: number = 0) {
    this.priorities.set(item, priority)
    super.add(item)

    return this
  }

  /**
   * remove item from the priority queue
   *
   * @param {T} item
   * @param {Comparator} customFindingComparator
   * @returns
   * @memberof PriorityQueue
   */
  public remove(item: T, customFindingComparator: Comparator) {
    super.remove(item, customFindingComparator)
    this.priorities.delete(item)

    return this
  }

  /**
   * change item's priority
   *
   * @param {T} item
   * @param {number} priority
   * @returns
   * @memberof PriorityQueue
   */
  public changePriority(item: T, priority: number) {
    this.remove(item, new Comparator(this.compareValue))
    this.add(item, priority)

    return this
  }

  /**
   * find by value
   *
   * @param {T} item
   * @returns
   * @memberof PriorityQueue
   */
  public findByValue(item: T) {
    return this.find(item, new Comparator(this.compareValue))
  }

  /**
   * has value
   *
   * @param {T} item
   * @returns {boolean}
   * @memberof PriorityQueue
   */
  public hasValue(item: T): boolean {
    return this.findByValue(item).length > 0
  }

  /**
   * compare two elements' priorities
   *
   * @param {T} a
   * @param {T} b
   * @returns {number}
   * @memberof PriorityQueue
   */
  public comparePriority(a: T, b: T): number {
    const priorityOfA = this.priorities.get(a)
    const priorityOfB = this.priorities.get(b)

    if (priorityOfA === priorityOfB) {
      return 0
    }

    return priorityOfA < priorityOfB ? -1 : 1
  }

  /**
   * compare a and b
   *
   * @param {T} a
   * @param {T} b
   * @returns {number}
   * @memberof PriorityQueue
   */
  public compareValue(a: T, b: T): number {
    if (a === b) {
      return 0
    }

    return a < b ? -1 : 1
  }
}
