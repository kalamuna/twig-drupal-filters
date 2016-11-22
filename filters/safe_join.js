var Twig = require('twig');

module.exports = function () {
  return Twig.filters.join.apply(null, arguments);
};
