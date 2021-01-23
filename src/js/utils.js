/**
 * Checks date and if date < length add character before date
 *
 * @param {number} date - date params
 * @param {number} length - desired date length
 * @param {number} character - parameter which is added if date < length
 */
export const dateFormattedFun = (date, length, character) => {
  if (
    !date ||
    typeof date !== "number" ||
    typeof length !== "number" ||
    typeof character !== "number"
  )
    return console.error("dateFormattedFun: not correctly params");

  return new Array(length - date.toString().length + 1).join(character) + date;
};
