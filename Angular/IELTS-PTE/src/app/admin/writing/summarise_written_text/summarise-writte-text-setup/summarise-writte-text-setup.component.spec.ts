import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummariseWritteTextSetupComponent } from './summarise-writte-text-setup.component';

describe('SummariseWritteTextSetupComponent', () => {
  let component: SummariseWritteTextSetupComponent;
  let fixture: ComponentFixture<SummariseWritteTextSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummariseWritteTextSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummariseWritteTextSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
