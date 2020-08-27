import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightWordComponent } from './highlight-word.component';

describe('HighlightWordComponent', () => {
  let component: HighlightWordComponent;
  let fixture: ComponentFixture<HighlightWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
