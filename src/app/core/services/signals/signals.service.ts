import { EffectRef, Injectable, WritableSignal, effect } from '@angular/core';
import { User } from '../../models/user';
import { EncryptionService } from 'src/app/shared/utils/encryption.service';

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  userSignal!: WritableSignal<User>;
  localStorage: EffectRef;

  constructor(private encriptionService: EncryptionService) {
    //Si almacenamos un usuario en el signal, encriptamos su id y la guardamos en el localstorage
    this.localStorage = effect(() => {
      if (!this.userSignal().id) return;
      const encriptedId = this.encriptionService.encryptId(
        this.userSignal().id
      );
      console.log('entra aqui');
      localStorage.setItem('userId', encriptedId);
    });
  }

  /**
   *
   * @param userSignal Signal that will be used to store the user
   */
  public setUserSignal(userSignal: WritableSignal<User>) {
    console.warn('set');
    this.userSignal = userSignal;
  }

  /**
   *
   * @returns Signal that stores the user
   */
  public getUserSignal(): WritableSignal<User> {
    console.log('entra aqui');
    return this.userSignal;
  }
}
