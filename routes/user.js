const express = require("express");
const { signupController, signinController } = require("../controllers/user");
const { body } = require("express-validator");
const UserModel = require("../models/user");

const router = express.Router();

//routes
router.put(
  "/signup",
  [
    body("name").trim().not().isEmpty().withMessage("Name cannot be empty"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is invalid")
      .custom((value, { req }) => {
        //Todo: check if email is already taken
        return UserModel.findOne({ email: value }).then((email) => {
          if (email) {
            return Promise.reject("Email already taken");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .not()
      .isEmpty()
      .withMessage("password cannot be empty"),
  ],
  signupController
);

router.post(
  "/signin",
  [
    body("email").not().isEmpty().withMessage("Email is invalid"),
    body("password").trim().isLength({ min: 5 }),
  ],
  signinController
);

module.exports = router;
