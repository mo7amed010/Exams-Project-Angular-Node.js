import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  examId!: string;
  questionForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService,
    private fb: FormBuilder
  ) {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      correctAnswer: ['1', Validators.required]
    });
  }

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('id') || '';
  }

  cancel() {
    this.router.navigate(['/exams', this.examId, 'questions']);
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const formData = this.questionForm.value;
      
      const options = [
        formData.option1,
        formData.option2,
        formData.option3,
        formData.option4
      ];
      
      const questionData = {
        q: formData.question,
        options: options,
        correct_answer: options[parseInt(formData.correctAnswer) - 1],
        exam_id: this.examId
      };

      this.examService.addQuestion(questionData).subscribe({
        next: () => {
          alert('Question added successfully');
          this.router.navigate(['/exams', this.examId, 'questions']);
        },
        error: (error) => {
          console.error('Error adding question:', error);
          alert('Failed to add question. Please try again.');
        }
      });
    }
  }
} 