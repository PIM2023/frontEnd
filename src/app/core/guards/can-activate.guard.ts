import { Injectable, WritableSignal } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { SignalsService } from '../services/signals/signals.service';
import { NavController } from '@ionic/angular';
import { EncryptionService } from 'src/app/shared/utils/encryption.service';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard {
  userSignal: WritableSignal<User>;
  constructor(
    private signalsService: SignalsService,
    private encryptionService: EncryptionService,
    private userService: UserService,
    private navCtrl: NavController
  ) {
    this.userSignal = this.signalsService.getUserSignal();
  }

  /**
   * Si hay un id de usuario en el localStorage, lo desencriptamos y lo usamos para obtener el usuario.
   * Si el usuario existe, lo guardamos en el signal y devolvemos true.
   * Si el usuario no existe, redirigimos a la página de login.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | Observable<true | Promise<boolean>>
    | UrlTree {
    const encriptedId = localStorage.getItem('userId');
    console.warn('encriptedId', encriptedId);

    if (encriptedId) {
      console.warn('if');
      return of(encriptedId).pipe(
        map((encriptedId) => this.encryptionService.decryptId(encriptedId!)),
        switchMap((originalId) => this.userService.getUserProfile(+originalId)),
        catchError((error) => {
          return of(error);
        }),
        map((response) => {
          console.warn('response guard', response);
          if (response.error) {
            return this.navCtrl.navigateRoot('/welcome');
          } else {
            this.userSignal.set(response);
            return true;
          }
        })
      );
    } else {
      console.warn('else');
      return this.navCtrl.navigateRoot('/welcome');
    }
  }
}
