const fs = require("fs");

module.exports = function (args) {
  if (args.length === 0) {
    console.log("Argument missing");
    return false;
  } else {
    const dirName = args[0];
    try {
      const stats = fs.statSync(dirName);
      if (stats.isFile()) {
        console.log("expected directory but received file");
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log("File does not exist");
      return false;
    }
  }
};
