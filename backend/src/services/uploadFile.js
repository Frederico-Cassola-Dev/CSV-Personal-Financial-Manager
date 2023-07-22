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
    const csvFile = fs.createReadStream(`./public/uploads/${newFileName}`);
    // const newHeaders = [
    //   "bank_date",
    //   "value",
    //   "type",
    //   "description",
    //   "type1",
    //   "type2",
    // ];
    return new Promise((resolve) => {
      Papa.parse(csvFile, {
        delimiter: ";",
        header: false,
        downloadRequestBody: true,
        complete: (results) => {
          const dataRaw = results.data;

          const cleanedData = dataRaw.map((row) =>
            row.filter((value) => value !== "")
          );

          // const jsonData = cleanedData.map((row) => {
          //   const obj = {};
          //   row.forEach((value, index) => {
          //     obj[newHeaders[index]] = value;
          //   });
          //   return obj;
          // });

          req.body.cleanedData = cleanedData;
          req.body.fileNameCSV = newFileName;
          req.body.originalFile = req.file;
          resolve(dataRaw);
          next();
        },
      });
    });
  };

  parseCsv();
};

module.exports = { postFile };
