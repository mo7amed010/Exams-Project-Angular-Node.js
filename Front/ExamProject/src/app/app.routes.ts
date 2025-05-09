import { Routes } from '@angular/router';
import { ExamsComponent } from './pages/exams/exams.component';
import { ExamComponent } from './pages/exam/exam.component';
import { UpdateExamComponent } from './pages/update-exam/update-exam.component';
import { CreateExamComponent } from './pages/create-exam/create-exam.component';
import { ResultComponent } from './pages/result/result.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EditQuestionsComponent } from './pages/edit-questions/edit-questions.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component'; 
import {LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {path:"exams", component:ExamsComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"exams/create", component:CreateExamComponent},
  {path:"exams/:id/edit", component:UpdateExamComponent},
  {path:"exams/:id/questions", component:EditQuestionsComponent},
  {path:"exams/:id/questions/add", component:AddQuestionComponent},
  {path:"exams/:id", component:ExamComponent},
  {path:"exams/:userId/result", component:ResultComponent},
  {path:"login", component:LoginComponent},
  { path:'register', component: RegisterComponent }, 
  {path:"**", component:NotFoundComponent},
];
