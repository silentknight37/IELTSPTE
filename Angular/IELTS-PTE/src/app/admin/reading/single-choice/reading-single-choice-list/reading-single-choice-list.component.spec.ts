import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingSingleChoiceListComponent } from './reading-single-choice-list.component';

describe('ReadingSingleChoiceListComponent', () => {
  let component: ReadingSingleChoiceListComponent;
  let fixture: ComponentFixture<ReadingSingleChoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingSingleChoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingSingleChoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
