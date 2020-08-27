import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescribeImageDisplayComponent } from './describe-image-display.component';

describe('DescribeImageDisplayComponent', () => {
  let component: DescribeImageDisplayComponent;
  let fixture: ComponentFixture<DescribeImageDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescribeImageDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescribeImageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
