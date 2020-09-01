const puppeteer = require("puppeteer");

const selectLanguageFromDropdown = require("./translations")
  .selectLanguageFromDropdown;
const inputOutput = require("./translations").inputOutput;
const getTranslations = require("./translations").getTranslations;
const readJSONkeys = require("./filesystem").readJSONKeys;
const writeJSONKeys = require("./filesystem").writeJSONKeys;

const INPUT_LANG = "English";
const OUTPUT_LANG = "Spanish";
const inputFile = "src/test.json";
const outputFile = "src/newlang.json";

const main = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://translate.google.com/");
  await selectLanguageFromDropdown(page, INPUT_LANG, inputOutput.input);
  await selectLanguageFromDropdown(page, OUTPUT_LANG, inputOutput.output);

  const keys = await readJSONkeys(inputFile);
  const translatedDict = await getTranslations(page, keys);
  await writeJSONKeys(outputFile, translatedDict);

  await page.close();
  await browser.close();
};

main();
