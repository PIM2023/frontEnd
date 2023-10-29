import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard {
  constructor(
    private signalsService: SignalsService,
    private encryptionService: EncryptionService,
    private userService: UserService,
    private navCtrl: NavController
  ) {}

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

    if (encriptedId) {
      return of(encriptedId).pipe(
        map((encriptedId) => this.encryptionService.decryptId(encriptedId!)),
        switchMap((originalId) => this.userService.getUserById(+originalId)),
        catchError((error) => {
          return of(error);
        }),
        map((response) => {
          if (response.error) {
            return this.navCtrl.navigateRoot('/login');
          } else {
            this.signalsService.setUserSignal(response);
            return true;
          }
        })
      );
    } else {
      return this.navCtrl.navigateRoot('/login');
    }
  }
}
