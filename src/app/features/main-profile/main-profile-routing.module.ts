import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'name/:username',
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
