import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamService } from '../../services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iexam } from '../../models/iexam';

@Component({
  selector: 'app-update-exam',
  imports: [ReactiveFormsModule],
  templateUrl: './update-exam.component.html',
  styleUrl: './update-exam.component.css'
})
export class UpdateExamComponent {
  constructor(private examService:ExamService,private router:Router, private activatedRoute:ActivatedRoute){}
  examId!:any;
  title!:Iexam;


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.examId = params.get("id");
        this.getTitle.setValue('');
        this.getDescription.setValue('');
        this.getcreated_by.setValue('');
      }
    });

    this.examService.getExamById(this.examId).subscribe({
      next: (response) => {
        const examData = response.data;
    
        this.examForm.patchValue({
          title: examData.title,
          description: examData.description,
          created_by: examData.created_by
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  examForm = new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(3)]),
    description: new FormControl('',Validators.required),
    created_by: new FormControl('',Validators.required),
  })
  get getTitle(){
    return this.examForm.controls.title;
  }
  get getDescription(){
    return this.examForm.controls.description;
  }
  get getcreated_by(){
    return this.examForm.controls.created_by;
  }
  add(){
    if(this.examForm.status == 'VALID'){
        this.examService.editExam(this.examForm.value,this.examId).subscribe({
          next: ()=>{
            this.router.navigate(['/dashboard']);
          },
          error:(error)=>{
            console.log(error);
          }
        });
      
    }else{
      console.log("Fix errors");
      
    }
  }

  navigateToEditQuestions() {
    this.router.navigate(['/exams', this.examId, 'questions']);
  }
}

