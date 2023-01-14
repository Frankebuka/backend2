const express = require("express");
const {
  listBanksController,
  createBankController,
  updateBankController,
  deleteBankController,
} = require("../controllers/banks");
const { body } = require("express-validator");
const BankModel = require("../models/bank");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

//routes
// // view banks - get method
// server.get("/bank", listBanksController);
// view bank by id or by viewing all banks - get method
router.get("/banks/:id?", isAuth, listBanksController);
// create bank - post method
router.post(
  "/banks",
  isAuth,
  [
    body("name").trim().not().isEmpty().withMessage("Name cannot be empty"),
    body("location")
      .trim()
      .not()
      .isEmpty()
      .withMessage("location cannot be empty"),
    body("branch").trim().not().isEmpty().withMessage("branch cannot be empty"),
    body("phone")
      .isMobilePhone("en-GH")
      .custom((value, { req }) => {
        return BankModel.findOne({ phone: value }).then((bankDoc) => {
          if (bankDoc) {
            return Promise.reject("Phone number already taken");
          }
        });
      }),
  ],
  createBankController
);
// update bank - put or patch method
router.put("/bank", isAuth, updateBankController);
// delete bank - delete method
router.delete("/bank", isAuth, deleteBankController);

module.exports = router;
