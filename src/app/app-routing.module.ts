import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'other-profile',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () => 
      import('./features/login/login.module').then( 
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'other-profile',
    loadChildren: () => 
      import('./features/other-profile/other-profile.module').then( 
        (m) => m.OtherProfilePageModule
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
