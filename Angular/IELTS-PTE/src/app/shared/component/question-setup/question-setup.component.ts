import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { QuestionSetupServiceService } from '../../services/question-setup-service.service';
import { QuestionSetup, ApiURL } from '../../common-question';
import {SpeechSynthesisUtteranceFactoryService,SpeechSynthesisService} from '@kamiazya/ngx-speech-synthesis'

@Component({
  selector: 'app-question-setup',
  templateUrl: './question-setup.component.html',
  styleUrls: ['./question-setup.component.scss']
})
export class QuestionSetupComponent implements OnInit {
  @Input() requestedURLs:ApiURL;
  submitted = false;
  questionForm: FormGroup;
  response:any;
  responseMessage:string;
  successResponse:boolean;
  responseClass:string;
  question = new QuestionSetup();
  id:number;
  
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
        questionSummary:[question.question]
    });
  }
  else{
    this.questionForm=this.fb.group({
      subject:['',Validators.required],
      question:['',Validators.required],
      timer:['',Validators.required],
      isFree:[false],
      status:[true],
      questionSummary:['']
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


    this.questionSetupService.createwithAction(this.question,this.requestedURLs.apiURL).subscribe(res=>{
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
    window.location.href=this.requestedURLs.backURL+"/list";
  }

  checkConductorViewOrCreate() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id != undefined) {
        this.getQuestionById(this.id);
      }
    })
    
  }

  getQuestionById(id:number){
    this.questionSetupService.getByAction(this.requestedURLs.apiURL+'/'+id).subscribe(res=>{
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
