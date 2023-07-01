const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const transactionControllers = require("./controllers/transactionControllers");
const categoryControllers = require("./controllers/categoryControllers");
const typeControllers = require("./controllers/typeControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.put("/categories/:id", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id", categoryControllers.destroy);

router.get("/types", typeControllers.browse);
router.get("/types/:id", typeControllers.read);
router.put("/types/:id", typeControllers.edit);
router.post("/types", typeControllers.add);
router.delete("/types/:id", typeControllers.destroy);

router.get("/transactions", transactionControllers.browse);
router.get("/transactions/:id", transactionControllers.read);
router.put("/transactions/:id", transactionControllers.edit);
router.post("/transactions", transactionControllers.add);
router.delete("/transactions/:id", transactionControllers.destroy);

module.exports = router;
