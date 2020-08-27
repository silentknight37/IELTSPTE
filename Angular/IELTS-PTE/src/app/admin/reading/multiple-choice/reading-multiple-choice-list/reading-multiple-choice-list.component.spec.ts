import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingMultipleChoiceListComponent } from './reading-multiple-choice-list.component';

describe('ReadingMultipleChoiceListComponent', () => {
  let component: ReadingMultipleChoiceListComponent;
  let fixture: ComponentFixture<ReadingMultipleChoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingMultipleChoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingMultipleChoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
