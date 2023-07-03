const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const Papa = require("papaparse");
const { v4: uuidv4 } = require("uuid");

const postFile = (req, res) => {
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

    return new Promise((resolve) => {
      Papa.parse(csvFile, {
        delimiter: ";",
        downloadRequestBody: true,
        complete: (results) => {
          const dataRaw = results.data;
          res.status(201).json({
            message: "File uploaded",
            newUploadedFileName: newFileName,
            parsedData: dataRaw,
          });
          resolve(dataRaw);
        },
      });
    });
  };

  parseCsv();
};

module.exports = { postFile };
