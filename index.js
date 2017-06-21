/**
 * Adds all the filters to the given Twig intstance.
 */
module.exports = function (twigInstance) {
  var filters = require('./filters')
  for (var filterName in filters) {
    if (filters[filterName]) {
      var filter = filters[filterName]
      twigInstance.extendFilter(filterName, filter)
    }
  }

  var functions = require('./functions')
  for (var functionName in functions) {
    if (functions[functionName]) {
      var func = functions[functionName]
      twigInstance.extendFunction(functionName, func)
    }
  }
}
