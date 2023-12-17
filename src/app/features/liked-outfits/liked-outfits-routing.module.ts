import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikedOutfitsPage } from './liked-outfits.page';

const routes: Routes = [
  {
    path: '',
    title: 'Clout - Mis me gusta',
    component: LikedOutfitsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikedOutfitsPageRoutingModule {}
