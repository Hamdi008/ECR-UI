import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPopupComponent } from './setting-popup.component';

describe('SettingPopupComponent', () => {
  let component: SettingPopupComponent;
  let fixture: ComponentFixture<SettingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
