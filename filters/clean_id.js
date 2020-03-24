/**
 * Prepares a string for use as a valid HTML ID.
 *
 * @param {string} id
 *   The ID to clean.
 *
 * @return {string}
 *   The cleaned ID.
 *
 * @see \Drupal\Component\Utility\Html::getId()
 */
module.exports = function (id) {
  // Ensure a valid string is being passed.
  if (!id || !id.toLowerCase) {
    return ''
  }

  var filter = {
    ' ': '-',
    _: '-',
    '[': '-',
    ']': ''
  }

  id = id.toLowerCase().replace(
    new RegExp(
      Object.keys(filter)
        .map(function (value) {
          return `(${value.replace(/[\\?*+|.^${}[\]()]/g, '\\$&')})`
        })
        .join('|'),
      'g'
    ),
    function (substring) {
      return filter[substring]
    }
  )

  // As defined in http://www.w3.org/TR/html4/types.html#type-name, HTML IDs can
  // only contain letters, digits ([0-9]), hyphens ("-"), underscores ("_"),
  // colons (":"), and periods ("."). We strip out any character not in that
  // list. Note that the CSS spec doesn't allow colons or periods in identifiers
  // (http://www.w3.org/TR/CSS21/syndata.html#characters), so we strip those two
  // characters as well.
  id = id.replace(/[^A-Za-z0-9\-_]/g, '') // eslint-disable-line unicorn/better-regex

  // Removing multiple consecutive hyphens.
  id = id.replace(/-+/g, '-')
  return id
}
