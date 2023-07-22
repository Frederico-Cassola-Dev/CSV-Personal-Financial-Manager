const models = require("../models");

const browse = (req, res) => {
  models.file
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const browseByUser = (req, res) => {
  const { userId } = req.params;
  models.file
    .findAllByUser(parseInt(userId, 10))
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.file
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
  const file = req.body;

  // TODO validations (length, format...)

  file.id = parseInt(req.params.id, 10);

  models.file
    .update(file)
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

const add = (req, res, next) => {
  const originalName = req.body.originalFile.originalname;
  const { fileNameCSV } = req.body;
  const accountNb = 123456;
  const startPeriod = "2023-06-01";
  const endPeriod = "2023-06-30";
  const { size } = req.body.originalFile;
  const userId = 1;

  models.file
    .insert(
      originalName,
      fileNameCSV,
      accountNb,
      startPeriod,
      endPeriod,
      size,
      userId
    )
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  next();
};

const destroy = (req, res) => {
  models.file
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
  browseByUser,
  read,
  edit,
  add,
  destroy,
};
