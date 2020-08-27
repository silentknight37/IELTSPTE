import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReOrderParagaphListComponent } from './re-order-paragaph-list.component';

describe('ReOrderParagaphListComponent', () => {
  let component: ReOrderParagaphListComponent;
  let fixture: ComponentFixture<ReOrderParagaphListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReOrderParagaphListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReOrderParagaphListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
