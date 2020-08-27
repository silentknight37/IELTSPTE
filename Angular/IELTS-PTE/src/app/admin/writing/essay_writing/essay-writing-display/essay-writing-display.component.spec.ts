import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayWritingDisplayComponent } from './essay-writing-display.component';

describe('EssayWritingDisplayComponent', () => {
  let component: EssayWritingDisplayComponent;
  let fixture: ComponentFixture<EssayWritingDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssayWritingDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssayWritingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
