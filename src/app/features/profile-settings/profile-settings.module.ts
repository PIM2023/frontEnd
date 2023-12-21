import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSettingsPageRoutingModule } from './profile-settings-routing.module';

import { ProfileSettingsPage } from './profile-settings.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSettingsPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [ProfileSettingsPage],
})
export class ProfileSettingsPageModule {}
