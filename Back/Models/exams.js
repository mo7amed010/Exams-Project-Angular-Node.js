const mongoose = require("mongoose");

const examSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "it's not unique"],
      minLength: [2, "must be 2 ro more characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    created_by: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const examModel = mongoose.model("exam", examSchema);
module.exports = examModel;
