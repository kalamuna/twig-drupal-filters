var assert = require('assert')
var twigPackage = require('twig')
var twigFilters = require('..')

var twig = twigPackage.twig

describe('twig-drupal', function () {
  // Add the Twig Filters to Twig.
  twigFilters(twigPackage)

  it('should use the clean_class filter', function (done) {
    var template = twig({
      data: '{{ value|clean_class }}'
    })
    var output = template.render({value: 'Hello World!'})
    assert.strictEqual(output, 'hello-world')
    done()
  })

  /**
   * Tests the clean_id filter.
   *
   * @see \Drupal\Tests\Component\Utility\testHtmlGetId
   */
  it('should use the clean_id filter', function (done) {
    var tests = [

      // Verify that letters, digits, and hyphens are not stripped from the ID.
      {
        data: {value: 'abcdefghijklmnopqrstuvwxyz-0123456789'},
        expected: 'abcdefghijklmnopqrstuvwxyz-0123456789'
      },
      // Verify that invalid characters are stripped from the ID.
      {
        data: {value: 'invalid,./:@\\^`{Üidentifier'},
        expected: 'invalididentifier'
      },
      // Verify Drupal coding standards are enforced.
      {
        data: {value: 'ID NAME_[1]'},
        expected: 'id-name-1'
      },
      // Verify that a repeated ID is [not] made unique.
      {
        data: {value: 'test-unique-id'},
        expected: 'test-unique-id'
      },
      {
        data: {value: 'test-unique-id'},
        expected: 'test-unique-id'
      }
    ]

    var template = twig({
      data: '{{ value|clean_id }}'
    })

    var outputs = tests.map(function (test) {
      return template.render(test.data)
    })

    outputs.forEach(function (output, index) {
      assert.strictEqual(output, tests[index].expected)
    })

    done()
  })

  it('should create a link', function (done) {
    var template = twig({
      data: 'Visit my {{ link(title, url, attributes) }}!'
    })
    var output = template.render({
      title: 'Website',
      url: 'http://example.com',
      attributes: {
        class: ['foo', 'bar', 'baz']
      }
    })
    assert.strictEqual(output, 'Visit my <a href="http://example.com" class="foo bar baz">Website</a>!')

    output = template.render({
      title: 'Site',
      url: 'http://example.com',
      attributes: {
        class: 'awesome'
      }
    })
    assert.strictEqual(output, 'Visit my <a href="http://example.com" class="awesome">Site</a>!')
    done()
  })
})
