import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingSingleChoiceSetupComponent } from './reading-single-choice-setup.component';

describe('ReadingSingleChoiceSetupComponent', () => {
  let component: ReadingSingleChoiceSetupComponent;
  let fixture: ComponentFixture<ReadingSingleChoiceSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingSingleChoiceSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingSingleChoiceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
