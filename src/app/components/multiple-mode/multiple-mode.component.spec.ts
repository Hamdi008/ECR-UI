import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleModeComponent } from './multiple-mode.component';

describe('MultipleModeComponent', () => {
  let component: MultipleModeComponent;
  let fixture: ComponentFixture<MultipleModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
