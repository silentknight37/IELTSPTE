import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInBlanksDisplayComponent } from './fill-in-blanks-display.component';

describe('FillInBlanksDisplayComponent', () => {
  let component: FillInBlanksDisplayComponent;
  let fixture: ComponentFixture<FillInBlanksDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInBlanksDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInBlanksDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
