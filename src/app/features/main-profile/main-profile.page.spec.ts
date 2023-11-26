import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainProfilePage } from './main-profile.page';

describe('MainProfilePage', () => {
  let component: MainProfilePage;
  let fixture: ComponentFixture<MainProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MainProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
