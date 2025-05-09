import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, FormControl } from '@angular/forms';
import { ExamService } from '../../services/exam.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  imports: [ReactiveFormsModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent implements OnInit{
  questions: any[] = [];
  examForm: FormGroup;
  examId: string = '';
  userId: string = '6811218b05c4b160df90bd01'; 

  constructor(
    private examService: ExamService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.examForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.examId = id;
        this.loadQuestions();
      }
    });
  }

  loadQuestions(): void {
    this.examService.getQuestionsByExamId(this.examId).subscribe({
      next: (response) => {
        this.questions = response.data;

        this.questions.forEach((q, index) => {
          this.examForm.addControl(`q${index}`, new FormControl(''));
        });
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    const formValues = this.examForm.value;
    const answers = Object.keys(formValues).map(key => {
      const questionIndex = parseInt(key.replace('q', ''));
      return {
        question_id: this.questions[questionIndex]._id,
        selected_option: formValues[key]
      };
    });

    const submissionData = {
      user_id: this.userId,
      answers: answers
    };

    this.examService.submitExamAnswers(submissionData, this.examId).subscribe({
      next: (response) => {
        console.log('Exam submitted successfully:', response);
        this.router.navigate(['exams/6811218b05c4b160df90bd01/result']);
      },
      error: (err) => {
        console.error('Error submitting exam:', err);
        alert('Failed to submit exam. Please try again.');
      }
    });
  }
}
