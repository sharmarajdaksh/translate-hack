const output = require("fs-extra/lib/output");

const outputTextSelector = require("../config").elementSelectors
  .outputTextSelector;

const getOutputText = async (page) => {
  const innerHTML = await page.$eval(outputTextSelector, (element) => {
    return element.innerHTML;
  });

  let re = /(<.*?>)?(\w*)(<\/\w*>)?/;
  return innerHTML.match(re)[2];
};

module.exports = getOutputText;
