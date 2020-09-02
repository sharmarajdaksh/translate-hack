const path = require("path");
const fs = require("fs-extra");

const argv = require("yargs")
  .string(["input-file", "output-dir", "output-languages", "config"])
  .example("$0 -i English.json -o locales/ -l Spanish -l French")
  .example("$0 -f translate-config.json")
  .alias("i", "input-file")
  .describe("i", "Path to input file")
  .nargs("i", 1)
  .alias("o", "output-dir")
  .describe("o", "Path to output directory")
  .nargs("i", 1)
  .alias("l", "output-languages")
  .describe("l", "Language to translate to")
  .alias("f", "config")
  .nargs("f", 1)
  .describe("f", "Path to config file")
  .help("h")
  .alias("h", "help").argv;

const readInputArguments = () => {
  let inputFile, outputDir, outputLanguages;

  if (argv.f) {
    const filepath = path.resolve(argv.f);
    const buffer_data = fs.readFileSync(filePath);
    let configData = JSON.parse(buffer_data);
    inputFile = configData.inputFile;
    outputDir = configData.outputDir;
    outputLanguages = configData.outputLanguages;
  }
  if (argv.i) {
    inputFile = path.resolve(argv.i);
  }
  if (argv.o) {
    outputDir = path.resolve(argv.o);
  }
  if (argv.l) {
    outputLanguages = argv.l;
  }

  if (!inputFile || !outputDir || !outputLanguages) {
    throw Error(
      "Invalid config. Please check config file and/or command line arguments"
    );
  }

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
