const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accounts: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
// module.exports = mongoose.model("User", UserSchema);
