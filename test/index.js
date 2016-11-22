var assert = require('assert'),
    twigFilters = require('..'),
    Twig = require('twig'),
    twig = Twig.twig;

describe('twig-drupal', function(){
  // Add the Twig Filters to Twig.
  twigFilters(Twig);

  it('should use the link filter', function(done){
    var template = twig({
      data: "{{ value|link('http://google.com') }}"
    });
    var output = template.render({value: "Google"});
    assert.equal(output, '<a href="http://google.com">Google</a>');
    done();
  });
});
