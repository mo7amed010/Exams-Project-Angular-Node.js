const express = require("express");
const router = express.Router();
const {
  getAllExams,
  addExam,
  editExam,
  deleteExam,
  submit,
  getResult,
  getExam,
} = require("../Controllers/exam");

const {
  getAllQuestions,
  addQuestion,
  editQuestion,
  deleteQuestion,
  getAllQuestionsForExam,
} = require("../Controllers/questions");

router.get("/", getAllExams);
router.post("/", addExam);
router.get("/questions", getAllQuestions);
router.post("/questions", addQuestion);

router.get("/:id", getExam);
router.patch("/:id", editExam);
router.delete("/:id", deleteExam);
// questions
router.get("/questions/:examId", getAllQuestionsForExam)
router.patch("/questions/:id", editQuestion);
router.delete("/questions/:id", deleteQuestion);
// resutlt
router.post("/:examId/submit", submit);
router.get("/results/:userId", getResult);

module.exports = router;
