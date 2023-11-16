import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import { MyCalendarComponent } from './calendar/calendar.component';
import { NgCalendarModule } from 'ionic2-calendar';

import localeEsES from '@angular/common/locales/es';

registerLocaleData(localeEsES, 'es-Es');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    HttpClientModule,
    NgCalendarModule,
  ],
  declarations: [ProfilePage, SettingsComponent, MyCalendarComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Es' }],
})
export class ProfilePageModule {}
