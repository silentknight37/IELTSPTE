import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingTheBlankListingComponent } from './filling-the-blank-listing.component';

describe('FillingTheBlankListingComponent', () => {
  let component: FillingTheBlankListingComponent;
  let fixture: ComponentFixture<FillingTheBlankListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillingTheBlankListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillingTheBlankListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
