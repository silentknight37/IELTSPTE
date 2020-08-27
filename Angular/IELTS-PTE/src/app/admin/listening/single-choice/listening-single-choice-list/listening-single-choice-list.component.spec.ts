import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningSingleChoiceListComponent } from './listening-single-choice-list.component';

describe('ListeningSingleChoiceListComponent', () => {
  let component: ListeningSingleChoiceListComponent;
  let fixture: ComponentFixture<ListeningSingleChoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningSingleChoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningSingleChoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
