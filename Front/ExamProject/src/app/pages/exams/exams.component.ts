import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Iexam } from '../../models/iexam';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  exams: Iexam[] = [];

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit(): void {
    this.examService.getAllExams().subscribe({
      next: (res) => {
        this.exams = res.data;
      },
      error: (error) => {
        console.error('Error loading exams:', error);
      }
    });
  }

  takeExam(id: string) {
    this.router.navigate(['/exams', id]);
  }
}
