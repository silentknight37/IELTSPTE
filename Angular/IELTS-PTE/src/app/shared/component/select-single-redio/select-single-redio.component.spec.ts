import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSingleRedioComponent } from './select-single-redio.component';

describe('SelectSingleRedioComponent', () => {
  let component: SelectSingleRedioComponent;
  let fixture: ComponentFixture<SelectSingleRedioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSingleRedioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSingleRedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
