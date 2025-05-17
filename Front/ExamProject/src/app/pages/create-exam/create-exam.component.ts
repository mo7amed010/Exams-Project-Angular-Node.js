import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamService } from '../../services/exam.service';
import { Router } from '@angular/router';
import { Iexam } from '../../models/iexam';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.css'
})
export class CreateExamComponent implements OnInit {
  constructor(
    private examService: ExamService, 
    private router: Router,
    private tokenService: TokenService
  ) {}

  prodct!: Iexam;

  examForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', Validators.required),
    created_by: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.examForm.reset();
    // Set the user ID from token
    const userId = this.tokenService.getUserIdFromToken();
    this.examForm.controls.created_by.setValue(userId);
  }

  get getTitle() {
    return this.examForm.controls.title;
  }

  get getDescription() {
    return this.examForm.controls.description;
  }

  get getUserId() {
    return this.examForm.controls.created_by;
  }

  add() {
    if (this.examForm.valid) {
      this.examService.addNewExam(this.examForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log("Fix errors");
    }
  }
}
