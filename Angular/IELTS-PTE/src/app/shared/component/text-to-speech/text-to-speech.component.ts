import { Component, OnInit } from '@angular/core';
import {SpeechSynthesisUtteranceFactoryService,SpeechSynthesisService} from '@kamiazya/ngx-speech-synthesis'

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.scss'],
  providers:[SpeechSynthesisUtteranceFactoryService]
})
export class TextToSpeechComponent implements OnInit {
  
  constructor(private f:SpeechSynthesisUtteranceFactoryService,private svc:SpeechSynthesisService) { }

  ngOnInit() {
    this.svc.speak(this.f.text("Hello"));
  }
  triggerListening(){
  }
}
