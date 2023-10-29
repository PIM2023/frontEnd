import { Injectable, WritableSignal } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  userSignal!: WritableSignal<User>;

  constructor() {}

  /**
   *
   * @param userSignal Signal that will be used to store the user
   */
  public setUserSignal(userSignal: WritableSignal<User>) {
    this.userSignal = userSignal;
  }

  /**
   *
   * @returns Signal that stores the user
   */
  public getUserSignal() {
    return this.userSignal;
  }
}
