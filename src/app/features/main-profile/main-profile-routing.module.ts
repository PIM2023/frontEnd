import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainProfilePage } from './main-profile.page';

const routes: Routes = [
  {
    path: '',
    component: MainProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainProfilePageRoutingModule {}
