module.exports = function (title, url, attributes) {
  attributes = attributes || {}
  let finalAttributes = ''

  // Loop through all the given attributes.
  for (let attribute in attributes) {
    let attributeValue = attributes[attribute];

    // Support arrays in the attributes list (e.g., class).
    if (attributeValue.isArray()) {
      finalAttributes += ' ' + attribute + '="' + attributeValue.join(' ') + '"'

    // Otherwise, allow toString() to do its thing.
    } else {
      finalAttributes += ' ' + attribute + '="' + attributeValue + '"'
    }
  }

  // Construct the link.
  return '<a href="' + url + '"' + finalAttributes + '>' + title + '</a>'
}
