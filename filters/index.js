var trans = require('./trans');

module.exports = {
  'link': require('./link'),
  't': trans,
  'trans': trans,
  'placeholder': trans,
  'without': trans,
  'clean_class': trans,
  'clean_id': trans,
  'render': trans,
  'format_date': trans,
  'drupal_escape': require('./drupal_escape'),
  'safe_join': require('./safe_join')
};
