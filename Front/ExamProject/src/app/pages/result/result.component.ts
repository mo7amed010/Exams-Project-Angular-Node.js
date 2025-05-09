import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  userId: string = '';
  result: any = null;
  results: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId) {
        this.userId = userId;
        this.loadUserResults();
      } else {
        this.error = 'User ID not found';
        this.loading = false;
      }
    });
  }

  loadUserResults(): void {
    this.loading = true;
    this.examService.getUserExamResults(this.userId).subscribe({
      next: (response) => {
        console.log(response);
        
        if (response.data && Array.isArray(response.data)) {
          this.results = response.data;
          if (this.results.length > 0) {
            this.results.sort((a, b) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            this.result = this.results[0]; 
          }
        } else if (response.data) {
          this.result = response.data;
          this.results = [this.result];
        }
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading user exam results:', err);
        this.error = 'Failed to load exam results. Please try again later.';
        this.loading = false;
      }
    });
  }

  selectResult(result: any): void {
    this.result = result;
    window.scrollTo(0, 0);
  }

  getScoreClass(score: number): string {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
}