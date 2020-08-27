import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescribeImageSetupComponent } from './describe-image-setup.component';

describe('DescribeImageSetupComponent', () => {
  let component: DescribeImageSetupComponent;
  let fixture: ComponentFixture<DescribeImageSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescribeImageSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescribeImageSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
