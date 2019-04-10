export type ICompareFunction = (a: any, b: any) => number

export default class Comparator {
  public compare: ICompareFunction

  /**
   * Creates an instance of Comparator.
   * 
   * @param {ICompareFunction} [compareFunction]
   * @memberof Comparator
   */
  constructor(compareFunction?: ICompareFunction) {
    this.compare = compareFunction || Comparator.defaultCompareFunction
  }

  /**
   * default compare function
   *
   * @static
   * @param {*} a
   * @param {*} b
   * @returns
   * @memberof Comparator
   */
  static defaultCompareFunction(a: any, b: any) {
    if (a === b) {
      return 0
    }

    return a < b ? -1 : 1
  }

  /**
   * compare a and b is equal
   *
   * @param {*} a
   * @param {*} b
   * @returns
   * @memberof Comparator
   */
  public equal(a: any, b: any) {
    return this.compare(a, b) === 0
  }

  /**
   * compare a if less than b
   *
   * @param {*} a
   * @param {*} b
   * @returns
   * @memberof Comparator
   */
  public lessThan(a: any, b: any) {
    return this.compare(a, b) < 0
  }

  /**
   * compare a if greater than b
   *
   * @param {*} a
   * @param {*} b
   * @returns
   * @memberof Comparator
   */
  public greaterThan(a: any, b: any) {
    return this.compare(a, b) > 0
  }

  /**
   * compare a if less than or equal b
   *
   * @param {*} a
   * @param {*} b
   * @returns
   * @memberof Comparator
   */
  public lessThanOrEqual(a: any, b: any) {
    return this.lessThan(a, b) || this.equal(a, b)
  }

  /**
   * compare a if greater than or equal b
   *
   * @param {*} a
   * @param {*} b
   * @returns
   * @memberof Comparator
   */
  public greaterThanOrEqual(a: any, b: any) {
    return this.greaterThan(a, b) || this.equal(a, b)
  }

  /**
   * reverse the comparation order
   *
   * @memberof Comparator
   */
  public reverse() {
    const compareOriginal = this.compare
    this.compare = (a, b) => compareOriginal(b, a)
  }
}