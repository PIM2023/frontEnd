import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileFollowingPage } from './profile-following.page';

describe('ProfileFollowingPage', () => {
  let component: ProfileFollowingPage;
  let fixture: ComponentFixture<ProfileFollowingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfileFollowingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
