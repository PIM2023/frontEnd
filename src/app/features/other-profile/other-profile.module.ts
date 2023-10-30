import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherProfilePageRoutingModule } from './other-profile-routing.module';

import { OtherProfilePage } from './other-profile.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OtherProfilePageRoutingModule,
    HttpClientModule,
  ],
  declarations: [OtherProfilePage]
})
export class OtherProfilePageModule {}
