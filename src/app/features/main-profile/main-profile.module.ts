import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainProfilePageRoutingModule } from './main-profile-routing.module';

import { MainProfilePage } from './main-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainProfilePageRoutingModule
  ],
  declarations: [MainProfilePage]
})
export class MainProfilePageModule {}
