import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        title: 'Clout',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'calendar',
        title: 'Clout - Calendario',
        loadChildren: () =>
          import('../calendar/calendar.module').then(
            (m) => m.CalendarPageModule
          ),
      },
      // {
      //   path: 'profile',
      //   loadChildren: () =>
      //     import('../profile/profile.module').then((m) => m.ProfilePageModule),
      // },
      // {
      //   path: 'other-profile',
      //   loadChildren: () =>
      //     import('../other-profile/other-profile.module').then(
      //       (m) => m.OtherProfilePageModule
      //     ),
      // },
      {
        path: 'profile',
        title: 'Clout - Perfil',
        loadChildren: () =>
          import('../main-profile/main-profile.module').then(
            (m) => m.MainProfilePageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
