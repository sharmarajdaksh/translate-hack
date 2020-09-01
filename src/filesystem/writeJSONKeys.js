const jsonfile = require("jsonfile");

const writeJSONKeys = async (outputFile, translatedDict) => {
  jsonfile.writeFile(outputFile, translatedDict, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};

module.exports = writeJSONKeys;
