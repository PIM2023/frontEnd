import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileFollowingPageRoutingModule } from './profile-following-routing.module';

import { ProfileFollowingPage } from './profile-following.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileFollowingPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [ProfileFollowingPage],
})
export class ProfileFollowingPageModule {}
