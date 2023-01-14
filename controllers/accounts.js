const AccountModel = require("../models/account");

const createAccountController = (req, res) => {
  const { name, number, accountType, bankId } = req.body;

  const account = new AccountModel({ name, number, accountType, bankId });

  account.save().then((result) => {
    if (result) {
      res.json({ message: "Account created", data: result });
    } else {
      res.json({ message: "Failed to create account", data: result });
    }
  });
};

const listAccountController = (req, res) => {
  AccountModel.find()
    .populate("bankId", "name location branch")
    // // to remove id
    // .populate("bankId", "name location branch -_id")
    .then((accounts) => {
      res.json({ data: accounts });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createAccountController,
  listAccountController,
};
