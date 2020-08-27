import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Answers } from 'src/app/admin/reading/fill-in-blank/filling-the-blank-answer-display/fillInBlanks';

@Component({
  selector: 'app-blank-drag-drop',
  templateUrl: './blank-drag-drop.component.html',
  styleUrls: ['./blank-drag-drop.component.scss']
})
export class BlankDragDropComponent {
  @Input() requestAnswer: Answers; 
  MANY_ITEMS = 'MANY_ITEMS';
  public many=[];
  @Output() responseAnswer: EventEmitter<Answers> =
  new EventEmitter<Answers>();
  public returnItem:Answers;
  public subs = new Subscription();


  public constructor(private dragulaService:DragulaService) {

    // dragulaService.drag(this.MANY_ITEMS).subscribe(({name,el,source})=>{
      
    //    if(this.many.length>0){
    //   //   //dragulaService.d(this.MANY_ITEMS).subscribe(()=>{
    //        debugger;
    //        dragulaService.find(this.MANY_ITEMS).;
           
    //   //     this.many=this.many.filter(i=>i!=name);
    //   //     //dragulaService.cancel(this.MANY_ITEMS);
    //   //   //});
    //   }
    // });
    
    // this.subs.add(dragulaService.drag(this.MANY_ITEMS).subscribe(({el,name,source})=>{
    //   if(this.many.length>0){
    //     debugger;
    //     dragulaService.find(this.MANY_ITEMS).drake.cancel(true);
    //   }
    // }));
    
    this.subs.add(
      
      dragulaService.dropModel(this.MANY_ITEMS)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
        
        
        if(target.id==this.requestAnswer.id.toString()){
          this.returnItem=new Answers();
          this.returnItem.id=this.requestAnswer.id;
          this.returnItem.correctAnswer=this.requestAnswer.correctAnswer;
          this.returnItem.selectAnswer=item;
          this.returnItem.isRemove=false;
          this.responseAnswer.emit(this.returnItem);
        }

        if(source.id==this.requestAnswer.id.toString()){
          this.returnItem=new Answers();
          this.returnItem.id=this.requestAnswer.id;
          this.returnItem.correctAnswer=this.requestAnswer.correctAnswer;
          this.returnItem.selectAnswer=item;
          this.returnItem.isRemove=true;
          this.responseAnswer.emit(this.returnItem);
        }
      })
    );
    this.subs.add(dragulaService.removeModel(this.MANY_ITEMS)
      .subscribe(({ el, source, item, sourceModel }) => {
      })
    );
  }
}
