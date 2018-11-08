'use strict';

/**
 * @fileoverview Rule to prefer ES6 to CJS
 * @author Jamund Ferguson
 */

const EXPORT_MESSAGE = 'Expected "export" or "export default"',
      IMPORT_MESSAGE = 'Expected "import" instead of "require()"';

function allowPrimitive(node, context) {
  if (context.options.indexOf('allow-primitive-modules') < 0) return false;
  if (node.parent.type !== 'AssignmentExpression') return false;
  return node.parent.right.type !== 'ObjectExpression';
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------


module.exports = {
  meta: {
    docs: {}
  },

  create: function (context) {

    return {

      'MemberExpression': function (node) {

        // module.exports
        if (node.object.name === 'module' && node.property.name === 'exports') {
          if (allowPrimitive(node, context)) return;
          context.report({ node, message: EXPORT_MESSAGE });
        }

        // exports.
        if (node.object.name === 'exports') {
          context.report({ node, message: EXPORT_MESSAGE });
        }
      },
      'CallExpression': function (call) {
        if (context.getScope().type !== 'module') return;

        if (call.callee.type !== 'Identifier') return;
        if (call.callee.name !== 'require') return;

        if (call.arguments.length !== 1) return;
        var module = call.arguments[0];

        if (module.type !== 'Literal') return;
        if (typeof module.value !== 'string') return;

        // keeping it simple: all 1-string-arg `require` calls are reported
        context.report({
          node: call.callee,
          message: IMPORT_MESSAGE
        });
      }
    };
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLWNvbW1vbmpzLmpzIl0sIm5hbWVzIjpbIkVYUE9SVF9NRVNTQUdFIiwiSU1QT1JUX01FU1NBR0UiLCJhbGxvd1ByaW1pdGl2ZSIsIm5vZGUiLCJjb250ZXh0Iiwib3B0aW9ucyIsImluZGV4T2YiLCJwYXJlbnQiLCJ0eXBlIiwicmlnaHQiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJjcmVhdGUiLCJvYmplY3QiLCJuYW1lIiwicHJvcGVydHkiLCJyZXBvcnQiLCJtZXNzYWdlIiwiY2FsbCIsImdldFNjb3BlIiwiY2FsbGVlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidmFsdWUiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7O0FBS0EsTUFBTUEsaUJBQWlCLHVDQUF2QjtBQUFBLE1BQ01DLGlCQUFpQiwwQ0FEdkI7O0FBR0EsU0FBU0MsY0FBVCxDQUF3QkMsSUFBeEIsRUFBOEJDLE9BQTlCLEVBQXVDO0FBQ3JDLE1BQUlBLFFBQVFDLE9BQVIsQ0FBZ0JDLE9BQWhCLENBQXdCLHlCQUF4QixJQUFxRCxDQUF6RCxFQUE0RCxPQUFPLEtBQVA7QUFDNUQsTUFBSUgsS0FBS0ksTUFBTCxDQUFZQyxJQUFaLEtBQXFCLHNCQUF6QixFQUFpRCxPQUFPLEtBQVA7QUFDakQsU0FBUUwsS0FBS0ksTUFBTCxDQUFZRSxLQUFaLENBQWtCRCxJQUFsQixLQUEyQixrQkFBbkM7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7OztBQUdBRSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTTtBQURGLEdBRFM7O0FBS2ZDLFVBQVEsVUFBVVYsT0FBVixFQUFtQjs7QUFFekIsV0FBTzs7QUFFTCwwQkFBb0IsVUFBVUQsSUFBVixFQUFnQjs7QUFFbEM7QUFDQSxZQUFJQSxLQUFLWSxNQUFMLENBQVlDLElBQVosS0FBcUIsUUFBckIsSUFBaUNiLEtBQUtjLFFBQUwsQ0FBY0QsSUFBZCxLQUF1QixTQUE1RCxFQUF1RTtBQUNyRSxjQUFJZCxlQUFlQyxJQUFmLEVBQXFCQyxPQUFyQixDQUFKLEVBQW1DO0FBQ25DQSxrQkFBUWMsTUFBUixDQUFlLEVBQUVmLElBQUYsRUFBUWdCLFNBQVNuQixjQUFqQixFQUFmO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFJRyxLQUFLWSxNQUFMLENBQVlDLElBQVosS0FBcUIsU0FBekIsRUFBb0M7QUFDbENaLGtCQUFRYyxNQUFSLENBQWUsRUFBRWYsSUFBRixFQUFRZ0IsU0FBU25CLGNBQWpCLEVBQWY7QUFDRDtBQUVGLE9BZkk7QUFnQkwsd0JBQWtCLFVBQVVvQixJQUFWLEVBQWdCO0FBQ2hDLFlBQUloQixRQUFRaUIsUUFBUixHQUFtQmIsSUFBbkIsS0FBNEIsUUFBaEMsRUFBMEM7O0FBRTFDLFlBQUlZLEtBQUtFLE1BQUwsQ0FBWWQsSUFBWixLQUFxQixZQUF6QixFQUF1QztBQUN2QyxZQUFJWSxLQUFLRSxNQUFMLENBQVlOLElBQVosS0FBcUIsU0FBekIsRUFBb0M7O0FBRXBDLFlBQUlJLEtBQUtHLFNBQUwsQ0FBZUMsTUFBZixLQUEwQixDQUE5QixFQUFpQztBQUNqQyxZQUFJZCxTQUFTVSxLQUFLRyxTQUFMLENBQWUsQ0FBZixDQUFiOztBQUVBLFlBQUliLE9BQU9GLElBQVAsS0FBZ0IsU0FBcEIsRUFBK0I7QUFDL0IsWUFBSSxPQUFPRSxPQUFPZSxLQUFkLEtBQXdCLFFBQTVCLEVBQXNDOztBQUV0QztBQUNBckIsZ0JBQVFjLE1BQVIsQ0FBZTtBQUNiZixnQkFBTWlCLEtBQUtFLE1BREU7QUFFYkgsbUJBQVNsQjtBQUZJLFNBQWY7QUFJRDtBQWpDSSxLQUFQO0FBb0NEO0FBM0NjLENBQWpCIiwiZmlsZSI6InJ1bGVzL25vLWNvbW1vbmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFJ1bGUgdG8gcHJlZmVyIEVTNiB0byBDSlNcbiAqIEBhdXRob3IgSmFtdW5kIEZlcmd1c29uXG4gKi9cblxuY29uc3QgRVhQT1JUX01FU1NBR0UgPSAnRXhwZWN0ZWQgXCJleHBvcnRcIiBvciBcImV4cG9ydCBkZWZhdWx0XCInXG4gICAgLCBJTVBPUlRfTUVTU0FHRSA9ICdFeHBlY3RlZCBcImltcG9ydFwiIGluc3RlYWQgb2YgXCJyZXF1aXJlKClcIidcblxuZnVuY3Rpb24gYWxsb3dQcmltaXRpdmUobm9kZSwgY29udGV4dCkge1xuICBpZiAoY29udGV4dC5vcHRpb25zLmluZGV4T2YoJ2FsbG93LXByaW1pdGl2ZS1tb2R1bGVzJykgPCAwKSByZXR1cm4gZmFsc2VcbiAgaWYgKG5vZGUucGFyZW50LnR5cGUgIT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHJldHVybiBmYWxzZVxuICByZXR1cm4gKG5vZGUucGFyZW50LnJpZ2h0LnR5cGUgIT09ICdPYmplY3RFeHByZXNzaW9uJylcbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJ1bGUgRGVmaW5pdGlvblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHt9LFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICdNZW1iZXJFeHByZXNzaW9uJzogZnVuY3Rpb24gKG5vZGUpIHtcblxuICAgICAgICAvLyBtb2R1bGUuZXhwb3J0c1xuICAgICAgICBpZiAobm9kZS5vYmplY3QubmFtZSA9PT0gJ21vZHVsZScgJiYgbm9kZS5wcm9wZXJ0eS5uYW1lID09PSAnZXhwb3J0cycpIHtcbiAgICAgICAgICBpZiAoYWxsb3dQcmltaXRpdmUobm9kZSwgY29udGV4dCkpIHJldHVyblxuICAgICAgICAgIGNvbnRleHQucmVwb3J0KHsgbm9kZSwgbWVzc2FnZTogRVhQT1JUX01FU1NBR0UgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV4cG9ydHMuXG4gICAgICAgIGlmIChub2RlLm9iamVjdC5uYW1lID09PSAnZXhwb3J0cycpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7IG5vZGUsIG1lc3NhZ2U6IEVYUE9SVF9NRVNTQUdFIH0pXG4gICAgICAgIH1cblxuICAgICAgfSxcbiAgICAgICdDYWxsRXhwcmVzc2lvbic6IGZ1bmN0aW9uIChjYWxsKSB7XG4gICAgICAgIGlmIChjb250ZXh0LmdldFNjb3BlKCkudHlwZSAhPT0gJ21vZHVsZScpIHJldHVyblxuXG4gICAgICAgIGlmIChjYWxsLmNhbGxlZS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVyblxuICAgICAgICBpZiAoY2FsbC5jYWxsZWUubmFtZSAhPT0gJ3JlcXVpcmUnKSByZXR1cm5cblxuICAgICAgICBpZiAoY2FsbC5hcmd1bWVudHMubGVuZ3RoICE9PSAxKSByZXR1cm5cbiAgICAgICAgdmFyIG1vZHVsZSA9IGNhbGwuYXJndW1lbnRzWzBdXG5cbiAgICAgICAgaWYgKG1vZHVsZS50eXBlICE9PSAnTGl0ZXJhbCcpIHJldHVyblxuICAgICAgICBpZiAodHlwZW9mIG1vZHVsZS52YWx1ZSAhPT0gJ3N0cmluZycpIHJldHVyblxuXG4gICAgICAgIC8vIGtlZXBpbmcgaXQgc2ltcGxlOiBhbGwgMS1zdHJpbmctYXJnIGByZXF1aXJlYCBjYWxscyBhcmUgcmVwb3J0ZWRcbiAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgIG5vZGU6IGNhbGwuY2FsbGVlLFxuICAgICAgICAgIG1lc3NhZ2U6IElNUE9SVF9NRVNTQUdFLFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICB9XG5cbiAgfSxcbn1cbiJdfQ==