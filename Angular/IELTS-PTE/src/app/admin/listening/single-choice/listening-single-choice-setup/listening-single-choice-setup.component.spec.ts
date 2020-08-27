import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningSingleChoiceSetupComponent } from './listening-single-choice-setup.component';

describe('ListeningSingleChoiceSetupComponent', () => {
  let component: ListeningSingleChoiceSetupComponent;
  let fixture: ComponentFixture<ListeningSingleChoiceSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningSingleChoiceSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningSingleChoiceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
