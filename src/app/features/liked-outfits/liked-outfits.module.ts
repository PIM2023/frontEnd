import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikedOutfitsPageRoutingModule } from './liked-outfits-routing.module';

import { LikedOutfitsPage } from './liked-outfits.page';
import { PostComponent } from 'src/app/shared/components/post/post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikedOutfitsPageRoutingModule,
    PostComponent,
  ],
  declarations: [LikedOutfitsPage],
})
export class LikedOutfitsPageModule {}
