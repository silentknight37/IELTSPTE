import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMissingWordDisplayComponent } from './select-missing-word-display.component';

describe('SelectMissingWordDisplayComponent', () => {
  let component: SelectMissingWordDisplayComponent;
  let fixture: ComponentFixture<SelectMissingWordDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMissingWordDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMissingWordDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
