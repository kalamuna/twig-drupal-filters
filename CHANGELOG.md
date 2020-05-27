# Change Log

## 3.1.2 - 2020-05-26

- Switch to `object-keys` for retrieving the object keys in `|without`
- Clean up null input of without

## 3.1.1 - 2020-03-24

- Fix cleanid() with invalid args

## 3.1.0 - 2020-03-04

- Update dependencies

## 3.0.0 - 2020-02-19

- [#30](https://github.com/kalamuna/twig-drupal-filters/pull/30) Implement actual `clean_id` filter, by [@fafnirical](https://github.com/fafnirical)
- [#29](https://github.com/kalamuna/twig-drupal-filters/pull/29) Implement actual `clean_class` filter, by [@fafnirical](https://github.com/fafnirical)
- [#33](https://github.com/kalamuna/twig-drupal-filters/pull/33) Implement actual `without` filter, by [@fafnirical](https://github.com/fafnirical)
- Updated dependencies

## 2.0.0 - 2018-06-21

- Removed the `|link()` filter
  - Use `link()` function instead
- Updated dependencies

## 1.1.0

- Added `link()` function

## 1.0.0

- Fix default seperator for `slugg`
- Updating coding standards

## 0.2.2

- Fix invalid parameters for `slugg`

## 0.2.1

- Removed `slugify` dependency

## 0.2.0

- Switched from [`slug`](http://npm.im/slug) to [`slugg`](http://npm.im/slugg) to simplify dependencies
