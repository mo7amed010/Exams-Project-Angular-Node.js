import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iexam } from '../models/iexam';
@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }
  baseUrl:string = "http://localhost:3002/exams";

  getAllExams():Observable<{ status: string, data: Iexam[] }>{
    return this.http.get<{ status: string, data: Iexam[] }>(this.baseUrl);
  }
  getExamById(id: string): Observable<{ status: string, data: Iexam }> {
    return this.http.get<{ status: string, data: Iexam }>(`${this.baseUrl}/${id}`);
  }
  addNewExam(pro:any):Observable<Iexam>{
    return this.http.post<Iexam>(this.baseUrl,pro);
  }
  editExam(pro:any,id:string):Observable<Iexam>{
    return this.http.patch<Iexam>(this.baseUrl + "/" + id,pro);
  }
  deleteExam(id:string):Observable<Iexam>{
    return this.http.delete<Iexam>(this.baseUrl + "/" + id);
  }
  getQuestionsByExamId(examId: string) {
    console.log("base url",this.baseUrl);
    return this.http.get<any>(`${this.baseUrl}/questions/${examId}`);
  }

  submitExamAnswers(data: any,examId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${examId}/submit`, data);
  }
  getUserExamResults(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/results/${userId}`);
  }

  getExamQuestions(examId: string): Observable<{ status: string, data: any[] }> {
    return this.http.get<{ status: string, data: any[] }>(`${this.baseUrl}/questions/${examId}`);
  }

  updateQuestion(questionId: string, questionData: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/questions/${questionId}`, questionData);
  }

  deleteQuestion(questionId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/questions/${questionId}`);
  }

  addQuestion(questionData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/questions`, questionData);
  }
}
