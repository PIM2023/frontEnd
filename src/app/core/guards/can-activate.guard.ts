import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SignalsService } from '../services/signals/signals.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard {
  constructor(
    private signalsService: SignalsService,
    private navCtrl: NavController
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //TO DO: CAMBIAR REGISTER POR LOGIN CUANDO FUNCIONE
    if (!this.signalsService.userSignal().id)
      return this.navCtrl.navigateRoot('/register');
    return true;
  }
}
