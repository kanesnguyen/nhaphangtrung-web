/**
 * @param   {number} number
 * @returns {string}
 */
export default (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
