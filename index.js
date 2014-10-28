var postcss = require('postcss');
var fs = require('fs');

generateAtBreakpoints = postcss(function(css) {
  var atRuleBase = postcss.atRule({ name: 'media', params: "(min-width: 641px)" });

  css.eachRule(function (rule, i) {
    var newRule = rule.clone();
    newRule.selector = rule.selector+"-at-lap"

    var atRule = atRuleBase.clone()
    atRule.append(newRule)
    css.insertAfter(rule, atRule);
  });
});
var css = fs.readFileSync("input.css", "utf8")

var result = generateAtBreakpoints.process(css)

fs.writeFileSync('output.css', result.css);
