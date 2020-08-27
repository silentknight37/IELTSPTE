import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { SpeechSynthesisService, SpeechSynthesisUtteranceFactoryService, SpeechSynthesisUtteranceEventHandler } from '@kamiazya/ngx-speech-synthesis';

@Component({
  selector: 'app-test-com',
  templateUrl: './test-com.component.html',
  styleUrls: ['./test-com.component.scss']
})
export class TestComComponent implements OnInit {

 //private fs:SpeechSynthesisUtteranceFactoryService,private svc:SpeechSynthesisService

  public constructor(private fs:SpeechSynthesisUtteranceFactoryService,private svc:SpeechSynthesisService) {
   
  }

  ngOnInit() {
    this.svc.speak(this.fs.text(""));
    //const client = new TextToSpeechClient();
    //client.synthesizeSpeech()
  }

  replay(){
    this.svc.speak(this.fs.text("||"));
  }

  
}
