const fs = require("fs");
const path = require("path");

const saveParsedCSVFile = (req, res, next) => {
  const { jsonData, fileNameCSV, originalFile } = req.body;
  const originalPathFile = path.join(
    __dirname,
    "../../public/uploads",
    "/jsonFiles",
    `${fileNameCSV}.json`
  );
  const newStringifiedJSONFile = JSON.stringify(jsonData);

  fs.writeFile(originalPathFile, newStringifiedJSONFile, (err) => {
    if (err) console.error(err);
  });
  req.body = { fileNameJson: `${fileNameCSV}.json`, originalFile };

  next();
};

module.exports = { saveParsedCSVFile };
