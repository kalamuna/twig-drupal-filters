var trans = require('./trans');
var slug = require('slug')

module.exports = {
  'link': require('./link'),
  't': trans,
  'trans': trans,
  'placeholder': trans,
  'without': trans,
  'clean_class': slug,
  'clean_id': slug,
  'render': trans,
  'format_date': trans,
  'drupal_escape': require('./drupal_escape'),
  'safe_join': require('./safe_join')
};
