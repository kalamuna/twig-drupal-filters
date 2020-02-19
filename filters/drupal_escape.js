var twig = require('twig')

module.exports = function () {
  return Reflect.apply(twig.filters.escape, null, arguments)
}
