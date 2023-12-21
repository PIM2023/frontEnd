import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainProfilePageRoutingModule } from './main-profile-routing.module';

import { MainProfilePage } from './main-profile.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    MainProfilePageRoutingModule,
  ],
  declarations: [MainProfilePage],
})
export class MainProfilePageModule {}
