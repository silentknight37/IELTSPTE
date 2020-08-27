import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule,} from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material';
import { SelectSingleRedioComponent } from './component/select-single-redio/select-single-redio.component';
import { MultipleChoiceComponent } from './component/multiple-choice/multiple-choice.component';
import { SingleChoiceComponent } from './component/single-choice/single-choice.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  exports: [MatTableModule ]
})
export class SharedModule { }
