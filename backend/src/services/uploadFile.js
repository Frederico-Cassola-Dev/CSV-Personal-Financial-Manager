const fs = require("fs");
const Papa = require("papaparse");
const { v4: uuidv4 } = require("uuid");

const postFile = (req, res, next) => {
  const { originalname } = req.file;

  const { filename } = req.file;

  const newFileName = `${uuidv4()}-${originalname}`;
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${newFileName}`,
    (err) => {
      if (err) throw err;
    }
  );

  const parseCsv = async () => {
    //* Read the file in the server
    const csvFile = fs.createReadStream(`./public/uploads/${newFileName}`);
    const newHeaders = [
      "bank_date",
      "value",
      "type",
      "account",
      "description",
      "Age",
      "Age",
    ];
    return new Promise((resolve) => {
      Papa.parse(csvFile, {
        delimiter: ";",
        header: false,
        downloadRequestBody: true,
        complete: (results) => {
          const dataRaw = results.data;

          const jsonData = dataRaw.map((row) => {
            const obj = {};
            row.forEach((value, index) => {
              obj[newHeaders[index]] = value;
            });
            return obj;
          });

          req.body.jsonData = jsonData;
          req.body.fileName = newFileName;
          next();

          res.status(201).json({
            message: "File uploaded",
            newUploadedFileName: newFileName,
            parsedData: jsonData,
          });
          resolve(dataRaw);
        },
      });
    });
  };

  parseCsv();
};

module.exports = { postFile };
