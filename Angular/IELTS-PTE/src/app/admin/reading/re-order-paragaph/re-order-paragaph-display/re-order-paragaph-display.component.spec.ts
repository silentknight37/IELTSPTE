import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReOrderParagaphDisplayComponent } from './re-order-paragaph-display.component';

describe('ReOrderParagaphDisplayComponent', () => {
  let component: ReOrderParagaphDisplayComponent;
  let fixture: ComponentFixture<ReOrderParagaphDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReOrderParagaphDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReOrderParagaphDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
