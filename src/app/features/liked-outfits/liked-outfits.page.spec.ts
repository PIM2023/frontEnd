import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikedOutfitsPage } from './liked-outfits.page';

describe('LikedOutfitsPage', () => {
  let component: LikedOutfitsPage;
  let fixture: ComponentFixture<LikedOutfitsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LikedOutfitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
