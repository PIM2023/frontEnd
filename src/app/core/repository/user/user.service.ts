import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../base/repository.repository';

export class UserRepository extends Repository {
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * This method is used to register a user
   * @param email user email
   * @param password user password
   * @param firstName user first name
   * @param lastName user last name
   * @param height user height
   * @param weight user weight
   * @param heightVisible user height visibility
   * @param weightVisible user weight visibility
   * @param avatar user avatar
   * @returns Observable that tells if the user was registered or not
   */
  registerUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    height?: number,
    weight?: number,
    heightVisible?: boolean,
    weightVisible?: boolean,
    avatar?: string
  ) {
    return this.doRequest<any>('get', `/register`, {
      headers: {
        email: email,
      },
    });
  }
}
