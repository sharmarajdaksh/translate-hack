const output = require("fs-extra/lib/output");

const outputTextSelector = require("../config").elementSelectors
  .outputTextSelector;

const getOutputText = async (page) => {
  return await page.$eval(outputTextSelector, (element) => {
    return element.innerHTML;
  });
};

module.exports = getOutputText;
