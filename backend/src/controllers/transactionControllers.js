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
  const { jsonData } = req.body;
  // console.log("🚀 - jsonData:", jsonData);

  const transactionItems = jsonData;

  const transactionsArray = [];
  for (let i = 0; i < transactionItems.length; i += 1) {
    const secondLevelArray = [];
    for (let j = 0; j < transactionItems.length; j += 1) {
      secondLevelArray.push(Object.values(transactionItems[i]));
    }
    transactionsArray.push(secondLevelArray);
  }

  const finalArray = transactionsArray.flat();
  // console.log("🚀 - finalArray:", finalArray);

  models.transaction
    .insert(finalArray)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
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
  read,
  edit,
  add,
  destroy,
};
