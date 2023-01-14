const { validationResult } = require("express-validator");
const BankModel = require("../models/bank");

// // list all banks controller
// const listBanksController = (req, res) => {
//   //   const banks = BankModel.all();
//   //   res.json({ data: banks });

//   BankModel.find()
//     .then((banks) => {
//       res.json({ data: banks });
//     })
//     .catch((err) => console.log(err));
// };

// list a bank by id controller
const listBanksController = (req, res) => {
  const { id } = req.params;

  if (id) {
    BankModel.find({ _id: id })
      .then((banks) => {
        res.json({ data: banks });
      })
      .catch((err) => console.log(err));
  } else {
    BankModel.find()
      .then((banks) => {
        res.json({ data: banks });
      })
      .catch((err) => console.log(err));
  }
};

// create a bank controller
const createBankController = (req, res) => {
  //validation checks
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.json({ message: errors.array()[0].msg });
  }

  const { name, location, branch, phone, address, accountNumber } = req.body;

  const bank = new BankModel({
    name,
    location,
    branch,
    phone,
    address,
    accountNumber,
  });

  bank
    .save()
    .then((result) => {
      res.json({ message: "create successful", data: result });
    })
    .catch((error) => console.log(error));
};

// update a bank controller
const updateBankController = (req, res) => {
  const { id, name, location, branch, phone, address, accountNumber } =
    req.body;
  // //   updating query using mongoDb to return an array of objects to update a particular field
  //   BankModel.find({ _id: id })
  //     .then((banks) => {
  //       if (banks.length > 0) {
  //         banks[0].name = name;
  //         banks[0].location = location;
  //         banks[0].branch = branch;
  //         banks[0].phone = phone;
  //         banks[0].address = address;
  //         banks[0].accountNumber = accountNumber;

  //         banks[0].save();

  //         res.json({ message: "update successful", data: banks[0] });
  //       }
  //     })
  //     .catch((err) => console.log(err));

  //   Another better way of updating query using mongoDb to find a particular field by id
  BankModel.findById(id)
    .then((bank) => {
      if (bank) {
        bank.name = name;
        bank.location = location;
        bank.branch = branch;
        bank.phone = phone;
        bank.address = address;
        bank.accountNumber = accountNumber;

        bank.save();

        res.json({ message: "update successful", data: bank });
      }
      res.json({ message: "Document cannot be found" });
    })
    .catch((err) => console.log(err));

  // // manuel method
  // const { name, location, branch, phone, address, accountNumber } = req.body;
  // const updatedBank = BankModel.update({
  //   name,
  //   location,
  //   branch,
  //   phone,
  //   address,
  //   accountNumber,
  // });
  // res.json({ message: "update successful", data: updatedBank });
};

// delete a bank controller;
const deleteBankController = (req, res) => {
  const { id } = req.body;
  BankModel.findByIdAndRemove(id).then((deletedBank) => {
    if (deletedBank) {
      accountModel
        .deleteMany({ bankId: deletedBank._id })
        .then((result) => {
          res.json({ message: "bank deleted", data: deletedBank });
        })
        .catch((err) => console.log(err));
      return;
    }
    res.json({ message: "bank not found" });
  });

  // // manuel method
  //   const { name } = req.body;
  //   const deletedBank = BankModel.delete({ name });
  //   res.json({ message: "bank deleted", data: deletedBank });
};

module.exports = {
  listBanksController,
  createBankController,
  updateBankController,
  deleteBankController,
};
