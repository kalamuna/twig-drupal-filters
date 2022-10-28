module.exports = function (title, url, attributes) {
  attributes = attributes || {}
  let finalAttributes = ''

  // Loop through all the given attributes.
  for (let attribute in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, attribute)) {
      // Support arrays in the attributes list (e.g., class), or the object's toString().
      finalAttributes += ' ' + attribute + '="' + (Array.isArray(attributes[attribute]) ? attributes[attribute].join(' ') : attributes[attribute]) + '"'
    }
  }

  // Construct the link.
  return '<a href="' + url + '"' + finalAttributes + '>' + title + '</a>'
}
