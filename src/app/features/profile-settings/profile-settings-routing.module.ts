import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSettingsPage } from './profile-settings.page';

const routes: Routes = [
  {
    path: '',
    title: 'Clout - Editar perfil',
    component: ProfileSettingsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSettingsPageRoutingModule {}
