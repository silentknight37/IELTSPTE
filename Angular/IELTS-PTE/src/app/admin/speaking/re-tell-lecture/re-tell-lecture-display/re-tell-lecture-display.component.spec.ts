import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReTellLectureDisplayComponent } from './re-tell-lecture-display.component';

describe('ReTellLectureDisplayComponent', () => {
  let component: ReTellLectureDisplayComponent;
  let fixture: ComponentFixture<ReTellLectureDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReTellLectureDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReTellLectureDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
