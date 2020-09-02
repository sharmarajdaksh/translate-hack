module.exports = {
NAMESPACE: "test", //translated file name eg. test.json gets created in each $LOCALE folder. 
outputDir: `public/locales/$LOCALE`, //output directory, $LOCALE gets replaced by language
inputFile: "src/test.json", //change file for every translation
outputLanguages: ["fr", "es", "hi"], //only use abbreviations
inputLang: "English"
}

