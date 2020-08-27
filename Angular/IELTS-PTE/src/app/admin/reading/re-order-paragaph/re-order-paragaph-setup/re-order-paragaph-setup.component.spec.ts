import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReOrderParagaphSetupComponent } from './re-order-paragaph-setup.component';

describe('ReOrderParagaphSetupComponent', () => {
  let component: ReOrderParagaphSetupComponent;
  let fixture: ComponentFixture<ReOrderParagaphSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReOrderParagaphSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReOrderParagaphSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
