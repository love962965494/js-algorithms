/**
 * set bitPostion bit value 1
 *
 * @export
 * @param {number} number
 * @param {number} bitPosition
 * @returns
 */
export default function setBit(number: number, bitPosition: number) {
  return number | (1 << bitPosition)
}