module.exports = function (title, url, attributes) {
  attributes = attributes || {}
  let finalAttributes = ''

  // Loop through all the given attributes.
  for (let attribute in attributes) {
    // If it's a string, just output it.
    if (typeof attributes[attributes] === 'string') {
      finalAttributes += ' ' + attribute + '="' + attributes[attribute] + '"'

    // Otherwise, allow arrays to concat to strings.
    } else if (attributes[attribute].join) {
      finalAttributes += ' ' + attribute + '="' + attributes[attribute].join(' ') + '"'

    // Otherwise, let them figure it out.
    } else {
      finalAttributes += ' ' + attribute + '="' + attributes[attribute] + '"'
    }
  }

  // Construct the link.
  return '<a href="' + url + '"' + finalAttributes + '>' + title + '</a>'
}
