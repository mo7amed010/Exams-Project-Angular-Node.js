const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    q: {
      type: String,
      required: [true, "question is required"],
      minLength: [4, "question must be 4 ro more characters"],
    },
    options: {
      type: [String],
      required: [true, "options is required"],
    },
    correct_answer: {
      type: String,
      required: [true, "correct answer is required"],
    },
    exam_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "exam",
      required: [true, "exam_id is required"],
    },
  },
  { timestamps: true }
);

const questionModel = mongoose.model("questions", questionSchema);
module.exports = questionModel;
