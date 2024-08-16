import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleModeComponent } from './single-mode.component';

describe('SingleModeComponent', () => {
  let component: SingleModeComponent;
  let fixture: ComponentFixture<SingleModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
