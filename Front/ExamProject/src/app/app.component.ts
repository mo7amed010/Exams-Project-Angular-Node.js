import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';
import { StudentNavComponent } from './layout/student-nav/student-nav.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, StudentNavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExamProject';
  constructor(private router: Router) {}

  isAuthPage(): boolean {
    return this.router.url === '/register' || this.router.url === '/login';
  }

  isStudentPage(): boolean {
    const currentUrl = this.router.url;
    if (currentUrl === '/exams') return true;
    
    if (/^\/exams\/[^\/]+$/.test(currentUrl) && 
        !currentUrl.includes('/create') && 
        !currentUrl.includes('/edit') && 
        !currentUrl.includes('/questions')) return true;
        if (/^\/exams\/[^\/]+\/result$/.test(currentUrl)) return true;
    
    return false;
  }
}
