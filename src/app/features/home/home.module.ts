import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from 'src/app/core/services/post/post.service';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { ToastService } from 'src/app/shared/utils/toast.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    PostComponent,
  ],
  providers: [PostService, ToastService],
  declarations: [HomePage],
})
export class HomePageModule {}
