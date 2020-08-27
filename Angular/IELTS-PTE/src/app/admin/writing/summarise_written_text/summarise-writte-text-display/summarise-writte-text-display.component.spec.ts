import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummariseWritteTextDisplayComponent } from './summarise-writte-text-display.component';

describe('SummariseWritteTextDisplayComponent', () => {
  let component: SummariseWritteTextDisplayComponent;
  let fixture: ComponentFixture<SummariseWritteTextDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummariseWritteTextDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummariseWritteTextDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
