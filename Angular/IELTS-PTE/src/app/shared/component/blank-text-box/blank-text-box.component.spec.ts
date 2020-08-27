import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankTextBoxComponent } from './blank-text-box.component';

describe('BlankTextBoxComponent', () => {
  let component: BlankTextBoxComponent;
  let fixture: ComponentFixture<BlankTextBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankTextBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
