import { Injectable, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  userSignal!: WritableSignal<any>;

  constructor() {}

  /**
   *
   * @param userSignal Signal that will be used to store the user
   */
  public setUserSignal(userSignal: WritableSignal<any>) {
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
