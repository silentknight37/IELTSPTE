import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMissingWordListComponent } from './select-missing-word-list.component';

describe('SelectMissingWordListComponent', () => {
  let component: SelectMissingWordListComponent;
  let fixture: ComponentFixture<SelectMissingWordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMissingWordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMissingWordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
