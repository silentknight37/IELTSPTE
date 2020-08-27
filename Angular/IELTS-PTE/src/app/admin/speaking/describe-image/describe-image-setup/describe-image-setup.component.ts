import { Component, OnInit } from '@angular/core';
import { ApiURL, QuestionSetup } from 'src/app/shared/common-question';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { QuestionSetupServiceService } from 'src/app/shared/services/question-setup-service.service';
import { SpeechSynthesisUtteranceFactoryService, SpeechSynthesisService } from '@kamiazya/ngx-speech-synthesis';

@Component({
  selector: 'app-describe-image-setup',
  templateUrl: './describe-image-setup.component.html',
  styleUrls: ['./describe-image-setup.component.scss']
})
export class DescribeImageSetupComponent implements OnInit {

  submitted = false;
  questionForm: FormGroup;
  response:any;
  responseMessage:string;
  successResponse:boolean;
  responseClass:string;
  question = new QuestionSetup();
  id:number;
  selectedFile:File;
  imageUrl:string;
  
  constructor(private activatedRoute: ActivatedRoute,private fb: FormBuilder,private questionSetupService:QuestionSetupServiceService,private fs:SpeechSynthesisUtteranceFactoryService,private svc:SpeechSynthesisService) { }

  ngOnInit() {
    this.checkConductorViewOrCreate();
    if(this.question!=null){
      this.createQuestionForm(this.question);
    }
    else{
      this.createQuestionForm(null);
    }   
  }
  

  createQuestionForm(question:QuestionSetup){
    if(question!=null){
    this.questionForm=this.fb.group({
      subject:[question.subject,Validators.required],
        question:[question.question,Validators.required],
        timer:[question.timer,Validators.required],
        isFree:[question.isFree],
        status:[question.status],
        questionSummary:[question.question],
        selectedImage:[]
    });
    this.imageUrl=question.imagePath;
  }
  else{
    this.questionForm=this.fb.group({
      subject:['',Validators.required],
      question:['',Validators.required],
      timer:['',Validators.required],
      isFree:[false],
      status:[true],
      questionSummary:[''],
      selectedImage:[]
    });
  }
  }

  get f() { return this.questionForm.controls; }

  
  saveQuestion(){
    debugger;
    this.submitted=true;

    if(this.questionForm.invalid){
      return;
    }

    
    this.question=Object.assign({},this.question,this.questionForm.value);
    debugger;


    this.questionSetupService.createwithImageFileAction(this.selectedFile, this.question,'api/DescribeImage').subscribe(res=>{
      this.response = res;   
      this.responseMessage=this.response.message;
      this.successResponse=true;
      this.responseClass="successResponse"; 
      this.createQuestionForm(null);
      this.submitted=false;
    },
  error =>{
    this.responseMessage=error;
    this.successResponse=false;
    this.responseClass="errorResponse";
  })
    
  
  }

  back(){
    window.location.href='admin/describe-image'+"/list";
  }

  checkConductorViewOrCreate() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id != undefined) {
        this.getQuestionById(this.id);
      }
    })
    
  }

  onFileChanged(event){
    this.selectedFile=event.target.files[0];
  }

  getQuestionById(id:number){
    this.questionSetupService.getByAction('api/DescribeImage'+'/'+id).subscribe(res=>{
      this.question=res.records;
      this.createQuestionForm(this.question);
    },
  error =>{})
  }

  triggerQuestion(){
    

    this.question=Object.assign({},this.question,this.questionForm.value);

    if(this.question.question==null || this.question.question==''){
      this.svc.speak(this.fs.text("Please Enter Question Text"));
      return;
    }
    this.svc.speak(this.fs.text(this.question.question));
  }

}
