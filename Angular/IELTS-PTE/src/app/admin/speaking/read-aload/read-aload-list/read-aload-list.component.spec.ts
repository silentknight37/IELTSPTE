import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAloadListComponent } from './read-aload-list.component';

describe('ReadAloadListComponent', () => {
  let component: ReadAloadListComponent;
  let fixture: ComponentFixture<ReadAloadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAloadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAloadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
