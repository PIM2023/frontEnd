import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './core/guards/can-activate.guard';

const routes: Routes = [
  {
    path: 'register',
    title: 'Registro',
    loadChildren: () =>
      import('./features/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    canActivate: [CanActivateGuard],
    title: 'Clout',
    loadChildren: () =>
      import('./features/main/main.module').then((m) => m.MainPageModule),
  },
  {
    path: 'post/:id',
    loadChildren: () =>
      import('./features/post/post.module').then((m) => m.PostPageModule),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./features/landing/landing.module').then(
        (m) => m.LandingPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
