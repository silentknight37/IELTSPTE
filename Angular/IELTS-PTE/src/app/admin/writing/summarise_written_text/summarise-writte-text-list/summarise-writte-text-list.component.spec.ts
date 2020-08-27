import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummariseWritteTextListComponent } from './summarise-writte-text-list.component';

describe('SummariseWritteTextListComponent', () => {
  let component: SummariseWritteTextListComponent;
  let fixture: ComponentFixture<SummariseWritteTextListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummariseWritteTextListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummariseWritteTextListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
