import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Questions, ApiURL } from '../../common-question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input() requestedURLs:ApiURL;
  
  public questions=new Questions();
  
  constructor(private commonService:CommonService) { }

  ngOnInit() {
    this.commonService.getByAction(this.requestedURLs.apiURL).subscribe(res=>{
      this.questions=res.records;
    },
  error =>{})
  }

  addNew(){
    window.location.href=this.requestedURLs.backURL;
  }

}
