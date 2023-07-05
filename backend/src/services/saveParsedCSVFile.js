const fs = require("fs");
const path = require("path");

const saveParsedCSVFile = (req, res) => {
  const { jsonData, fileName } = req.body;
  const originalPathFile = path.join(
    __dirname,
    "../../public/uploads",
    "/jsonFiles",
    `${fileName}.json`
  );
  const newStringifiedJSONFile = JSON.stringify(jsonData);

  fs.writeFile(originalPathFile, newStringifiedJSONFile, (err) => {
    if (err) console.error(err);
  });
  res.status(204).json({ message: "file saved in json format" });
};

module.exports = { saveParsedCSVFile };
