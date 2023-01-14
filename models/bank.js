// let banksDb = require("./db");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BankSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  accounts: [
    {
      accountId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    },
  ],
});

const BankModel = mongoose.model("Bank", BankSchema);

module.exports = BankModel;

//Bank model
// class BankModel {
//   constructor({ name, location, branch, phone, address, accountNumber }) {
//     this.name = name;
//     this.location = location;
//     this.branch = branch;
//     this.phone = phone;
//     this.address = address;
//     this.accountNumber = accountNumber;
//   }

//   save() {
//     banksDb.push(this);
//     return this;
//   }

//   static all() {
//     return banksDb;
//   }

//   static update(updateInfo = {}) {
//     banksDb = banksDb.map((bank) => {
//       if (bank.name === updateInfo.name) {
//         return { ...bank, ...updateInfo };
//       }

//       return bank;
//     });
//   }

//   static delete({ name }) {
//     let deletedBank = null;

//     banksDb = banksDb.filter((bank) => {
//       if (bank.name !== name) {
//         return true;
//       }
//       deletedBank = bank;

//       return false;
//     });

//     return deletedBank;
//   }
// }

// module.exports = BankModel;
