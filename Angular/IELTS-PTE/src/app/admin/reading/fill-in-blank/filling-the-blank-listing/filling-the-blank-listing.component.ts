import { Component, OnInit } from '@angular/core';
import { ReadingFillingTheBlanksService } from '../reading-filling-the-blanks.service';
import { Questions, FillInBlanks, QuestionSetup } from '../filling-the-blank-answer-display/fillInBlanks';

@Component({
  selector: 'app-filling-the-blank-listing',
  templateUrl: './filling-the-blank-listing.component.html',
  styleUrls: ['./filling-the-blank-listing.component.scss']
})
export class FillingTheBlankListingComponent implements OnInit {

  public questions=new Questions();
  public questionDetail= new QuestionSetup();


  constructor(private fillingTheBlanksService:ReadingFillingTheBlanksService) { }

  ngOnInit() {
    this.fillingTheBlanksService.getByAction('api/FillingTheBlanks').subscribe(res=>{
      this.questions=res.records;
    },
  error =>{})
  }

  addNew(){
    window.location.href='admin/'+"filling-the-blanks";
  }

  getModal(item:QuestionSetup){
    this.questionDetail=new QuestionSetup();
    this.questionDetail= item;
  }
}
