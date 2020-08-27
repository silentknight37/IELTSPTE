import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInBlanksSetupComponent } from './fill-in-blanks-setup.component';

describe('FillInBlanksSetupComponent', () => {
  let component: FillInBlanksSetupComponent;
  let fixture: ComponentFixture<FillInBlanksSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInBlanksSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInBlanksSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
