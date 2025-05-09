const questionModel = require("../Models/questions");
const { CatchAsync } = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");

exports.getAllQuestions = CatchAsync(async (req, res, next) => {
  let questions = await questionModel.find();
  if (!questions.length < 1) {
    return res.json({ status: "success", data: questions });
  } else {
    next(new AppError(404, "no Questions avaible"));
  }
});

exports.getAllQuestionsForExam = CatchAsync(async (req, res, next) => {
  let examId = req.params.examId;
  let questions = await questionModel.find({ exam_id: examId });

  if (questions.length > 0) {
    return res.json({ status: "success", data: questions });
  } else {
    next(new AppError(404, "No questions available for this exam"));
  }
});

exports.addQuestion = CatchAsync(async (req, res, next) => {
  console.log(req.body);

  let newQuestion = req.body;
  let question = await questionModel.create(newQuestion);
  if (question) {
    return res.status(201).json({ status: "success", data: question });
  } else {
    next(new AppError(422, "fail to add question"));
  }
});

exports.editQuestion = CatchAsync(async (req, res, next) => {
  let newQuestion = req.body;
  let questionId = req.params.id;

  let question = await questionModel.findByIdAndUpdate(questionId, newQuestion);
  if (question) {
    let updatedQuestion = await questionModel.findById(questionId);
    return res.json({
      status: "Question edited successfully",
      data: updatedQuestion,
    });
  } else {
    next(new AppError(422, "fail to edit question"));
  }
});

exports.deleteQuestion = CatchAsync(async (req, res, next) => {
  let questionId = req.params.id;
  let question = await questionModel.findByIdAndDelete(questionId);
  if (question) {
    res.json({ status: "Question deleted successfully" });
  } else {
    next(new AppError(422, "fail to delete question"));
  }
});
