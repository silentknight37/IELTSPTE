import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayWritingListComponent } from './essay-writing-list.component';

describe('EssayWritingListComponent', () => {
  let component: EssayWritingListComponent;
  let fixture: ComponentFixture<EssayWritingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssayWritingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssayWritingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
