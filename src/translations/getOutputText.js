const output = require("fs-extra/lib/output");

const outputTextSelector = ".tlid-translation.translation > span";

const getOutputText = async (page) => {
  return await page.$eval(outputTextSelector, (element) => {
    return element.innerHTML;
  });
};

module.exports = getOutputText;
