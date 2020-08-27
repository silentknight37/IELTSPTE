import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayWritingSetupComponent } from './essay-writing-setup.component';

describe('EssayWritingSetupComponent', () => {
  let component: EssayWritingSetupComponent;
  let fixture: ComponentFixture<EssayWritingSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssayWritingSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssayWritingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
