import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReTellLectureListComponent } from './re-tell-lecture-list.component';

describe('ReTellLectureListComponent', () => {
  let component: ReTellLectureListComponent;
  let fixture: ComponentFixture<ReTellLectureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReTellLectureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReTellLectureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
