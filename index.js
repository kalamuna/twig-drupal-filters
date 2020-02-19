/**
 * Adds all the filters to the given Twig intstance.
 *
 * @param {Twig} twigInstance The instance of Twig to modify.
 */
module.exports = function (twigInstance) {
  const filters = require('./filters')
  for (let filterName in filters) {
    if (filters[filterName]) {
      let filter = filters[filterName]
      twigInstance.extendFilter(filterName, filter)
    }
  }

  const functions = require('./functions')
  for (let functionName in functions) {
    if (functions[functionName]) {
      let func = functions[functionName]
      twigInstance.extendFunction(functionName, func)
    }
  }
}
