var Twig = require('twig');

module.exports = function () {
  return Twig.filters.escape.apply(null, arguments);
};
