import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningMultipleChoiceListComponent } from './listening-multiple-choice-list.component';

describe('ListeningMultipleChoiceListComponent', () => {
  let component: ListeningMultipleChoiceListComponent;
  let fixture: ComponentFixture<ListeningMultipleChoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningMultipleChoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningMultipleChoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
