const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "it's not unique"],
      minLength: [4, "must be 4 character"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minLength: [3, "min length is 5"],
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let salt = await bcryptjs.genSalt(10);
  console.log(this);

  let hashedPass = await bcryptjs.hash(this.password, salt);
  this.password = hashedPass;
  next();
});

const usersModel = mongoose.model("users", userSchema);
module.exports = usersModel;
