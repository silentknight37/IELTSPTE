import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAloadSetupComponent } from './read-aload-setup.component';

describe('ReadAloadSetupComponent', () => {
  let component: ReadAloadSetupComponent;
  let fixture: ComponentFixture<ReadAloadSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAloadSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAloadSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
