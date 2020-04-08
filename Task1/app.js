const findFilesAndEncrypt = require("./files");
const fs = require("fs");
const isValidDir = require("./validate");

function cleanResult() {
  const resultFile = "result.txt";
  fs.access(resultFile, (err) => {
    if (err) {
      console.log("File already cleaned");
    } else {
      fs.unlinkSync(resultFile);
    }
  });
}

function main() {
  const args = process.argv.slice(2);
  if (isValidDir(args)) {
    cleanResult();
    const dirname = args[0];
    findFilesAndEncrypt(dirname);
  }
}

main();
