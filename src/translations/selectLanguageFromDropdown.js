// TODO: Move selectors to external conf files
const inputTextDropdownButtonSelector =
  "body > div.container > div.frame > div.page.tlid-homepage.homepage.translate-text > div.homepage-content-wrap > div.tlid-source-target.main-header > div.source-target-row > div.tlid-input.input > div.tlid-language-bar.ls-wrap > div.sl-wrap > div.sl-more.tlid-open-source-language-list";
const outputTextDropdownButtonSelector =
  "body > div.container > div.frame > div.page.tlid-homepage.homepage.translate-text > div.homepage-content-wrap > div.tlid-source-target.main-header > div.source-target-row > div.tlid-input.input > div.tlid-language-bar.ls-wrap > div.tl-wrap > div.tl-more.tlid-open-target-language-list";
const inputLanguagesSelector =
  ".language-list-unfiltered-langs-sl_list > * .language_list_item_language_name";
const outputLanguagesSelector =
  ".language-list-unfiltered-langs-tl_list > * .language_list_item_language_name";

const inputOutput = require("./inputOutput");

const selectLanguageFromDropdown = async (page, language, inputOrOutput) => {
  const dropdownButton = await page.$(
    inputOrOutput === inputOutput.input
      ? inputTextDropdownButtonSelector
      : outputTextDropdownButtonSelector
  );

  await dropdownButton.click();

  await page.$$eval(
    inputOrOutput === inputOutput.input
      ? inputLanguagesSelector
      : outputLanguagesSelector,
    (elements, language) => {
      const element = elements.find(
        (element) => element.innerHTML === language
      );
      element.click();
    },
    language
  );
};

module.exports = selectLanguageFromDropdown;
