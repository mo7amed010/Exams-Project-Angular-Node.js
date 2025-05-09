const examModel = require("../Models/exams");
const questionModel = require("../Models/questions");
const resultModel = require("../Models/result");
const { CatchAsync } = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");

exports.getAllExams = CatchAsync(async (req, res, next) => {
  let exams = await examModel.find();
  if (!exams.length < 1) {
    return res.json({ status: "success", data: exams });
  } else {
    next(new AppError(404, "no exams avaible"));
  }
});

exports.getExam = CatchAsync(async (req, res, next) => {
  let examId = req.params.id;
  let exam = await examModel.findById(examId);
  if (exam) {
    return res.json({ status: "success", data: exam });
  } else {
    next(new AppError(404, "exam not found"));
  }
});

exports.addExam = CatchAsync(async (req, res, next) => {
  let newExam = req.body;
  let exam = await examModel.create(newExam);
  if (exam) {
    return res.status(201).json({ status: "success", data: exam });
  } else {
    next(new AppError(422, "fail to add exam"));
  }
});

exports.editExam = CatchAsync(async (req, res, next) => {
  let newExam = req.body;
  let examId = req.params.id;

  let exam = await examModel.findByIdAndUpdate(examId, newExam);
  if (exam) {
    let updatedExam = await examModel.findById(examId);
    return res.json({
      status: "exam edited successfully",
      data: updatedExam,
    });
  } else {
    next(new AppError(422, "fail to edit exam"));
  }
});

exports.deleteExam = CatchAsync(async (req, res, next) => {
  let examId = req.params.id;
  let exam = await examModel.findByIdAndDelete(examId);
  if (exam) {
    res.json({ status: "Exam deleted successfully" });
  } else {
    next(new AppError(422, "fail to delete exam"));
  }
});

exports.submit = CatchAsync(async (req, res, next) => {
  const { user_id, answers } = req.body;

  const exam_id = req.params.examId;
  const questions = await questionModel.find({ exam_id: exam_id });
  let correctCount = 0;

  questions.forEach((question) => {
    const studentAnswer = answers.find(
      (ans) => ans.question_id == question._id.toString()
    );
    if (
      studentAnswer &&
      studentAnswer.selected_option === question.correct_answer
    ) {
      correctCount++;
    }
  });

  const totalQuestions = questions.length;

  const score = (correctCount / totalQuestions) * 100;

  const result = await resultModel.create({ user_id, exam_id, score, answers });
  if (result) {
    res.json({ status: "Exam Submited successfully" });
  } else {
    next(new AppError(422, "fail to submit exam"));
  }
});

exports.getResult = CatchAsync(async (req, res, next) => {
  let result = await resultModel
    .find({ user_id: req.params.userId })
    .populate("exam_id");
  if (result) {
    res.json({ status: "success", data: result });
  } else {
    next(new AppError(422, "fail to get exam result"));
  }
});
