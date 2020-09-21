module.exports = {
NAMESPACE: "test", //name of the translated file to be created in the output directory
outputDir: `public/locales/$LOCALE`, //output directory, NOTE: append path with /$LOCALE 
inputFile: "src/test.json", //change file for every translation
outputLanguages: ["fr", "en", "zh-CN"], //Language codes
inputLang: "English"
}

