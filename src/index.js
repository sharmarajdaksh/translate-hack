const puppeteer = require("puppeteer");

const selectLanguageFromDropdown = require("./translations")
  .selectLanguageFromDropdown;
const inputOutput = require("./translations").inputOutput;
const getTranslations = require("./translations").getTranslations;
const readJSONkeys = require("./filesystem").readJSONKeys;
const writeJSONKeys = require("./filesystem").writeJSONKeys;
const readInputArguments = require("./cmd").readInputArguments;

// We probably don't need to have another input language?
const INPUT_LANG = "English";

const main = async () => {
  const { inputFile, outputDir, outputLanguages } = readInputArguments();

  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();

  await page.goto("https://translate.google.com/");

  const keys = await readJSONkeys(inputFile);

  for (let language of outputLanguages) {
    await selectLanguageFromDropdown(page, INPUT_LANG, inputOutput.input);
    await selectLanguageFromDropdown(page, language, inputOutput.output);

    const translatedDict = await getTranslations(page, keys);
    await writeJSONKeys(outputDir, `${language}.json`, translatedDict);
  }
  await page.close();
  await browser.close();
};

main();
