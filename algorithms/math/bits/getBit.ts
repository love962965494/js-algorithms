/**
 * get bit value by bitPosition
 *
 * @export
 * @param {number} number
 * @param {number} bitPostion
 * @returns
 */
export default function getBit(number: number, bitPostion: number) {
  return (number >> bitPostion) & 1
}