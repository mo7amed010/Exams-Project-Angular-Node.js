const mongoose = require("mongoose");

const resultSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      required: [true, "user_id is required"],
    },
    exam_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "exam",
      required: [true, "exam_id is required"],
    },
    score: {
      type: Number,
      required: [true, "score is required"],
    },
    answers: [
      {
        question_id: mongoose.SchemaTypes.ObjectId,
        selected_option: String,
      },
    ],
  },
  { timestamps: true }
);

const resutlModel = mongoose.model("result", resultSchema);
module.exports = resutlModel;
