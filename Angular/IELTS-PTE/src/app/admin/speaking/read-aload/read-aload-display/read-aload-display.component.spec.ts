import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAloadDisplayComponent } from './read-aload-display.component';

describe('ReadAloadDisplayComponent', () => {
  let component: ReadAloadDisplayComponent;
  let fixture: ComponentFixture<ReadAloadDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAloadDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAloadDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
