const express = require("express");
const {
  createAccountController,
  listAccountController,
} = require("../controllers/accounts");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

//routes
router.post("/accounts", isAuth, createAccountController);

router.get("/accounts", isAuth, listAccountController);

module.exports = router;
