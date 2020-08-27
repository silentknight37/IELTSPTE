import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInBlanksListComponent } from './fill-in-blanks-list.component';

describe('FillInBlanksListComponent', () => {
  let component: FillInBlanksListComponent;
  let fixture: ComponentFixture<FillInBlanksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInBlanksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInBlanksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
