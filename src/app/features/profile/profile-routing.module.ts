import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
  {
    path: 'settings',
    title: 'Clout - Ajustes de perfil',
    loadChildren: () =>
      import('../profile-settings/profile-settings.module').then(
        (m) => m.ProfileSettingsPageModule
      ),
  },
  {
    path: 'following',
    loadChildren: () =>
      import('../profile-following/profile-following.module').then(
        (m) => m.ProfileFollowingPageModule
      ),
  },
  {
    path: 'likes',
    title: 'Clout - Me gusta',
    loadChildren: () =>
      import('../liked-outfits/liked-outfits.module').then(
        (m) => m.LikedOutfitsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
