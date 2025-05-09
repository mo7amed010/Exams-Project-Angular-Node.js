import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  exams: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.loading = true;
    this.examService.getAllExams().subscribe({
      next: (response) => {
        // console.log('Exams response:', response); 
        this.exams = response.data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading exams:', error);
        this.error = 'Failed to load exams. Please try again.';
        this.loading = false;
      }
    });
  }

  editExam(examId: string) {
    this.router.navigate(['/exams', examId, 'edit']);
  }

  deleteExam(examId: string) {
    if (confirm('Are you sure you want to delete this exam?')) {
      this.examService.deleteExam(examId).subscribe({
        next: () => {
          this.exams = this.exams.filter(exam => exam._id !== examId);
          alert('Exam deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting exam:', error);
          alert('Failed to delete exam. Please try again.');
        }
      });
    }
  }

  getQuestionCount(exam: any): number {
    return exam.questions ? exam.questions.length : 0;
  }
}
