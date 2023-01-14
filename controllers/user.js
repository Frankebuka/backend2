const { validationResult } = require("express-validator");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupController = (req, res) => {
  //validation checks
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.json({ message: errors.array()[0].msg });
  }

  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 7)
    .then((hashedPassword) => {
      const user = new UserModel({ name, email, password: hashedPassword });
      user
        .save()
        .then((user) => {
          res.json({
            message: "Sign up successful",
            data: { name: user.name, email: user.email },
          });
        })
        .catch((error) => {
          console.log(error);
          return res.json({ message: "Server error. Please try again." });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.json({ message: "Server error. Please try again." });
    });
};

const signinController = async (req, res) => {
  //async and awaits method;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    //find User
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ message: "user not found" });
    }

    //compare passwords
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
      return res.json({ message: "incorrect password" });
    }

    //signin authentication
    const token = jwt.sign(
      { name: user.name, email: user.email, userId: user._id },
      "superSecretKeyThatCannotBeEasilyGuessed",
      { expiresIn: "1hr" }
    );

    return res.json({ message: "user signed in", token: token });
  } catch (error) {
    return res.json({ message: "Server error. Please try again." });
  }

  //then and catch method;
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     console.log(errors);
  //     return res.json({ message: errors.array()[0].msg });
  //   }

  //   const { email, password } = req.body;

  //   //find the user with email in db;
  //   UserModel.findOne({ email: email })
  //     .then((user) => {
  //       if (user) {
  //         //compare password
  //         bcrypt
  //           .compare(password, user.password)
  //           .then((result) => {
  //             if (result) {
  //               console.log(result);
  //               return res.json({ message: "user signed in" });
  //             }
  //             return res.json({
  //               message: "Email and password combination is incorrect",
  //             });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             return res.json({
  //               message: "Failed to sign in. Please try again.",
  //             });
  //           });
  //         return;
  //       }
  //       return res.json({ message: "user not found" });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return res.json({ message: "Server error. Please try again." });
  //     });
};

module.exports = {
  signupController,
  signinController,
};
