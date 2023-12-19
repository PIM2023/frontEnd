import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileFollowingPage } from './profile-following.page';

const routes: Routes = [
  {
    path: '',
    title: 'Clout - Siguiendo',
    component: ProfileFollowingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileFollowingPageRoutingModule {}
