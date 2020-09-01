const path = require("path");

const argv = require("yargs")
  .string(["input-file", "output-dir", "output-languages"])
  .example("$0 -i English.json -o locales/ -l Spanish -l French")
  .alias("i", "input-file")
  .describe("i", "Path to input file")
  .nargs("i", 1)
  .alias("o", "output-dir")
  .describe("o", "Path to output directory")
  .nargs("i", 1)
  .alias("l", "output-languages")
  .describe("l", "Language to translate to")
  .demandOption(["i", "o", "l"])
  .help("h")
  .alias("h", "help").argv;

const readInputArguments = () => {
  const inputFile = path.resolve(argv.i);
  const outputDir = path.resolve(argv.o);
  let outputLanguages = argv.l;

  if (typeof outputLanguages === "string") {
    outputLanguages = [outputLanguages];
  }

  return {
    inputFile,
    outputDir,
    outputLanguages,
  };
};

module.exports = readInputArguments;
