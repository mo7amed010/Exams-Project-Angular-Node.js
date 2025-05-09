import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-edit-questions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css']
})
export class EditQuestionsComponent implements OnInit {
  examId!: string;
  questions: any[] = [];
  questionForms: FormGroup[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('id') || '';
    this.loadQuestions();
  }

  loadQuestions() {
    this.examService.getQuestionsByExamId(this.examId).subscribe({
      next: (response) => {
        console.log('Questions response:', response);
        this.questions = response.data || [];
        this.initializeForms();
      },
      error: (error) => {
        console.error('Error loading questions:', error);
      }
    });
  }

  initializeForms() {
    this.questionForms = this.questions.map(question => {
      console.log('Initializing form for question:', question);
      return this.fb.group({
        question: [question.q || '', Validators.required],
        option1: [question.options[0] || '', Validators.required],
        option2: [question.options[1] || '', Validators.required],
        option3: [question.options[2] || '', Validators.required],
        option4: [question.options[3] || '', Validators.required],
        correctAnswer: [this.getCorrectAnswerIndex(question.correct_answer, question.options) || '1', Validators.required]
      });
    });
  }

  getCorrectAnswerIndex(correctAnswer: string, options: string[]): string {
    const index = options.findIndex(option => option === correctAnswer);
    return (index + 1).toString();
  }

  updateQuestion(index: number) {
    if (this.questionForms[index].valid) {
      const questionId = this.questions[index]._id;
      const formData = this.questionForms[index].value;
      
      const options = [
        formData.option1,
        formData.option2,
        formData.option3,
        formData.option4
      ];
      const correctAnswerIndex = parseInt(formData.correctAnswer) - 1;
      
      const updateData = {
        q: formData.question,
        options: options,
        correct_answer: options[correctAnswerIndex]
      };
      
      // console.log('Sending update data:', updateData); 
      
      this.examService.updateQuestion(questionId, updateData).subscribe({
        next: () => {
          alert('Question updated successfully');
          this.loadQuestions();
        },
        error: (error) => {
          console.error('Error updating question:', error);
          alert('Error updating question. Please try again.');
        }
      });
    }
  }

  deleteQuestion(index: number) {
    if (confirm('Are you sure you want to delete this question?')) {
      const questionId = this.questions[index]._id;
      this.examService.deleteQuestion(questionId).subscribe({
        next: () => {
          this.questions.splice(index, 1);
          this.questionForms.splice(index, 1);
          alert('Question deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting question:', error);
          alert('Error deleting question. Please try again.');
        }
      });
    }
  }
} 