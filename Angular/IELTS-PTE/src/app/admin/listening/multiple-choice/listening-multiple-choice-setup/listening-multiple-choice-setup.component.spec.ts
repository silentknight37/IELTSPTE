import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningMultipleChoiceSetupComponent } from './listening-multiple-choice-setup.component';

describe('ListeningMultipleChoiceSetupComponent', () => {
  let component: ListeningMultipleChoiceSetupComponent;
  let fixture: ComponentFixture<ListeningMultipleChoiceSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningMultipleChoiceSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningMultipleChoiceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
