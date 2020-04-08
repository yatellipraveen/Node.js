const fs = require("fs");
const crypto = require("crypto");

const resultFile = "./result.txt";

module.exports = function (fileName) {
  const hashSHA = crypto.createHash("sha1");
  const hashMD = crypto.createHash("md5");

  const input = fs.createReadStream(fileName);
  input.on("readable", () => {
    const data = input.read();
    if (data) {
      hashSHA.update(data);
      hashMD.update(data);
    } else {
      const resultBuffer = `${fileName} ${hashSHA.digest(
        "hex"
      )} ${hashMD.digest("hex")} \n`;
      fs.appendFile(resultFile, resultBuffer, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`file ${fileName} appended \n`);
        }
      });
    }
  });
};
