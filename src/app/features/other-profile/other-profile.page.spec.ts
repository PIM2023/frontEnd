import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtherProfilePage } from './other-profile.page';

describe('OtherProfilePage', () => {
  let component: OtherProfilePage;
  let fixture: ComponentFixture<OtherProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
