const assert = require('assert')
const twigPackage = require('twig')
const twigFilters = require('..')

const twig = twigPackage.twig

describe('twig-drupal', function () {
  // Add the Twig Filters to Twig.
  twigFilters(twigPackage)

  /**
   * Tests the clean_class filter.
   *
   * @see \Drupal\Tests\Component\Utility\testCleanCssIdentifier
   * @see \Drupal\Tests\Component\Utility\testHtmlClass
   */
  it('should use the clean_class filter', function (done) {
    let tests = [
      // Verify that no valid ASCII characters are stripped from the identifier.
      {
        data: {value: 'abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ-0123456789'},
        expected: 'abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz-0123456789'
      },
      // Verify that valid UTF-8 characters are not stripped from the identifier.
      {
        data: {value: '¡¢£¤¥'},
        expected: '¡¢£¤¥'
      },
      // Verify that double underscores are not stripped from the identifier.
      {
        data: {value: 'css__identifier__with__double__underscores'},
        expected: 'css__identifier__with__double__underscores'
      },
      // Verify that invalid characters (including non-breaking space) are
      // stripped from the identifier.
      {
        data: {value: 'invalid !"#$%&\'()*+,./:;<=>?@[\\]^`{|}~ identifier'}, // eslint-disable-line unicorn/string-content
        expected: 'invalid---identifier'
      },
      // Verify that an identifier starting with a digit is replaced.
      {
        data: {value: '1cssidentifier'},
        expected: '_cssidentifier'
      },
      // Verify that an identifier starting with a hyphen followed by a digit is
      // replaced.
      {
        data: {value: '-1cssidentifier'},
        expected: '__cssidentifier'
      },
      // Verify that an identifier starting with two hyphens is replaced.
      {
        data: {value: '--cssidentifier'},
        expected: '__cssidentifier'
      },
      // Verify Drupal coding standards are enforced.
      {
        data: {value: 'CLASS NAME_[Ü]'},
        expected: 'class-name--ü'
      }
    ]

    let template = twig({
      data: '{{ value|clean_class }}'
    })

    let outputs = tests.map(function (test) {
      return template.render(test.data)
    })

    outputs.forEach(function (output, index) {
      assert.strictEqual(output, tests[index].expected)
    })

    done()
  })

  /**
   * Tests the clean_id filter.
   *
   * @see \Drupal\Tests\Component\Utility\testHtmlGetId
   */
  it('should use the clean_id filter', function (done) {
    let tests = [

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

    let template = twig({
      data: '{{ value|clean_id }}'
    })

    let outputs = tests.map(function (test) {
      return template.render(test.data)
    })

    outputs.forEach(function (output, index) {
      assert.strictEqual(output, tests[index].expected)
    })

    done()
  })

  /**
   * Tests the clean_id filter.
   *
   * @see \Drupal\Tests\Kernel/Theme/TwigFilterTest
   */
  it('should use the without filter', function (done) {
    // The variables to pass to the templates.
    const data = {
      quote: {
        content: 'You can only find truth with logic if you have already found truth without it.',
        author: 'Gilbert Keith Chesterton',
        date: '1874-1936'
      }
    }

    // No author
    let template = twig({
      data: 'No author: {{ quote|without("author")|join }}'
    })
    let output = template.render(data)
    assert.strictEqual(output, 'No author: You can only find truth with logic if you have already found truth without it.1874-1936')

    // Just author
    template = twig({
      data: 'Just author: {{ quote|without("content", "date")|join }}'
    })
    output = template.render(data)
    assert.strictEqual(output, 'Just author: Gilbert Keith Chesterton')

    done()
  })

  it('should create a link', function (done) {
    let template = twig({
      data: 'Visit my {{ link(title, url, attributes) }}!'
    })
    let output = template.render({
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
