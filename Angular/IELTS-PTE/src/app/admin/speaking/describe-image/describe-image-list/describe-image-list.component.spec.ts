import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescribeImageListComponent } from './describe-image-list.component';

describe('DescribeImageListComponent', () => {
  let component: DescribeImageListComponent;
  let fixture: ComponentFixture<DescribeImageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescribeImageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescribeImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
