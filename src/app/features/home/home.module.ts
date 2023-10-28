import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from 'src/app/core/services/post/post.service';
import { PostComponent } from '../../shared/post/post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    PostComponent,
  ],
  providers: [PostService],
  declarations: [HomePage],
})
export class HomePageModule {}
