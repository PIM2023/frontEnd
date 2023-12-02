import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainProfilePage } from './main-profile.page';
import { OtherProfilePage } from '../other-profile/other-profile.page';
import { ProfilePage } from '../profile/profile.page';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    loadChildren: () =>
      import('../profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: ':username',
    loadChildren: () =>
      import('../other-profile/other-profile.module').then(
        (m) => m.OtherProfilePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainProfilePageRoutingModule {}
