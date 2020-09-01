const inputTextInputFieldSelector = ".tlid-source-text-input";

const inputInputText = async (page, text) => {
  await page.$eval(
    inputTextInputFieldSelector,
    (el, text) => (el.value = text),
    text
  );
};

module.exports = inputInputText;
