import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMissingWordSetupComponent } from './select-missing-word-setup.component';

describe('SelectMissingWordSetupComponent', () => {
  let component: SelectMissingWordSetupComponent;
  let fixture: ComponentFixture<SelectMissingWordSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMissingWordSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMissingWordSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
