# Twig.js Drupal Extensions

Twig.js implementations of Drupal's Twig functions and filters. Most of these are just stubbed creations from [John Albin's work in KSS-Node](https://github.com/kss-node/kss-node/blob/master/builder/base/twig/extend-drupal8/drupal8-extensions.js).

## Usage

``` javascript
var Twig = require('twig')
var twigDrupal = require('twig-drupal')

// Add the filters to Drupal.
twigDrupal(Twig);
```
