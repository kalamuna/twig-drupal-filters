const twig = require('twig')

module.exports = function () {
  return Reflect.apply(twig.filters.join, null, arguments)
}
