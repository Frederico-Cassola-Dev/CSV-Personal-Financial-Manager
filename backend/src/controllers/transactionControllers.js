const models = require("../models");

const browse = (req, res) => {
  models.transaction
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByFileId = (req, res) => {
  const fileId = req.params.id;

  models.transaction
    .findAllByFileId(fileId)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.transaction
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const transaction = req.body;

  // TODO validations (length, format...)

  transaction.id = parseInt(req.params.id, 10);

  models.transaction
    .update(transaction)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {
  const { cleanedData } = req.body;

  for (let i = 0; i < cleanedData.length; i += 1) {
    for (let j = 0; j < cleanedData[i].length; j += 1) {
      if (cleanedData[i].length === 6) {
        cleanedData[i].push(1);
        cleanedData[i].push(1);
      }
      if (cleanedData[i].length === 5) {
        cleanedData[i].push("null");
        cleanedData[i].push(1);
        cleanedData[i].push(1);
      }
      if (cleanedData[i].length === 4) {
        cleanedData[i].push("null");
        cleanedData[i].push("null");
        cleanedData[i].push(1);
        cleanedData[i].push(1);
      }
      if (cleanedData[i].length === 3) {
        cleanedData[i].push("null");
        cleanedData[i].push("null");
        cleanedData[i].push("null");
        cleanedData[i].push(1);
        cleanedData[i].push(1);
      }
    }
  }

  models.transaction
    .insert(cleanedData)
    .then(() => {
      res.status(201);
    })
    .catch((err) => {
      console.error(err);
      // res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.transaction
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  browseByFileId,
  read,
  edit,
  add,
  destroy,
};
