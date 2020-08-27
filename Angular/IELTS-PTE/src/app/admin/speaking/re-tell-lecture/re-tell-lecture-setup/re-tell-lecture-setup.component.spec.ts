import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReTellLectureSetupComponent } from './re-tell-lecture-setup.component';

describe('ReTellLectureSetupComponent', () => {
  let component: ReTellLectureSetupComponent;
  let fixture: ComponentFixture<ReTellLectureSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReTellLectureSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReTellLectureSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
