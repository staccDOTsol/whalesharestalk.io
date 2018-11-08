// Generated by CoffeeScript 1.12.5
(function() {
  var Adapter, CoffeeScript, W, path, sourcemaps,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Adapter = require('../../adapter_base');

  sourcemaps = require('../../sourcemaps');

  path = require('path');

  W = require('when');

  CoffeeScript = (function(superClass) {
    var compile;

    extend(CoffeeScript, superClass);

    function CoffeeScript() {
      return CoffeeScript.__super__.constructor.apply(this, arguments);
    }

    CoffeeScript.prototype.name = 'coffee-script';

    CoffeeScript.prototype.extensions = ['coffee'];

    CoffeeScript.prototype.output = 'js';

    CoffeeScript.prototype.isolated = true;

    CoffeeScript.prototype._render = function(str, options) {
      var filename;
      filename = options.filename;
      if (options.sourcemap === true) {
        options.sourceMap = true;
      }
      options.sourceFiles = [filename];
      if (options.filename) {
        options.generatedFile = path.basename(filename).replace('.coffee', '.js');
      }
      return compile((function(_this) {
        return function() {
          return _this.engine.compile(str, options);
        };
      })(this));
    };

    compile = function(fn) {
      var data, err, res;
      try {
        res = fn();
      } catch (error) {
        err = error;
        return W.reject(err);
      }
      if (res.sourceMap) {
        data = {
          result: res.js,
          v2sourcemap: res.sourceMap,
          sourcemap: JSON.parse(res.v3SourceMap)
        };
        return sourcemaps.inline_sources(data.sourcemap).then(function(map) {
          data.sourcemap = map;
          return data;
        });
      } else {
        return W.resolve({
          result: res
        });
      }
    };

    return CoffeeScript;

  })(Adapter);

  module.exports = CoffeeScript;

}).call(this);
