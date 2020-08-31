const puppeteer = require("puppeteer");

const strEn = "Hello, how are you.";
const INPUT_LANG = "English";
const OUTPUT_LANG = "Spanish";

// Enum
const inputOutput = {
  input: "input",
  output: "output",
};

const selectLanguageFromDropdown = async (page, language, inputOrOutput) => {
  const inputTextDropdownButton = await page.$(
    inputOrOutput === inputOutput.input
      ? "body > div.container > div.frame > div.page.tlid-homepage.homepage.translate-text > div.homepage-content-wrap > div.tlid-source-target.main-header > div.source-target-row > div.tlid-input.input > div.tlid-language-bar.ls-wrap > div.sl-wrap > div.sl-more.tlid-open-source-language-list"
      : "body > div.container > div.frame > div.page.tlid-homepage.homepage.translate-text > div.homepage-content-wrap > div.tlid-source-target.main-header > div.source-target-row > div.tlid-input.input > div.tlid-language-bar.ls-wrap > div.tl-wrap > div.tl-more.tlid-open-target-language-list"
  );

  await inputTextDropdownButton.click();

  await page.$$eval(
    inputOrOutput === inputOutput.input
      ? ".language-list-unfiltered-langs-sl_list > * .language_list_item_language_name"
      : ".language-list-unfiltered-langs-tl_list > * .language_list_item_language_name",
    (elements, language) => {
      console.log(language);
      const element = elements.find(
        (element) => element.innerHTML === language
      );
      element.click();
    },
    language
  );
};

const inputInputText = async (page, text) => {
  await page.focus(".tlid-source-text-input");
  await page.keyboard.type(text);
};

const getOutputText = async (page) => {
  return await page.$eval(".tlid-translation.translation > span", (element) => {
    return element.innerHTML;
  });
};

const getTranslation = async (page, text) => {
  await inputInputText(page, text);
  // Manual Wait
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await getOutputText(page);
};

const main = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://translate.google.com/");

  await selectLanguageFromDropdown(page, INPUT_LANG, inputOutput.input);
  await selectLanguageFromDropdown(page, OUTPUT_LANG, inputOutput.output);

  const translatedText = await getTranslation(page, strEn);
  console.log(translatedText);
};

main();
