import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../base/repository.repository';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserRepository extends Repository {
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * This method is used to register a user
   * @param username Username of the user
   * @param bio Bio of the user
   * @param email Email of the user
   * @param password Password of the user
   * @param firstName First name of the user
   * @param lastName Last name of the user
   * @param bornDate Born date of the user
   * @param avatar Avatar of the user
   * @param height Height of the user
   * @param weight Weight of the user
   * @returns Observable that tells if the user was registered or not
   */
  registerUser(
    username: string,
    bio: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    bornDate: Date,
    avatar?: any,
    height?: number,
    weight?: number
  ) {
    return this.doRequest<User>('post', `/register`, {
      username: username,
      bio: bio,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      bornDate: bornDate,
      avatar: avatar,
      height: height,
      weight: weight,
    });
  }

  /**
   * This method is used to login a user
   * @param email Email of the user
   * @param password Password of the user
   * @returns Observable that tells if the user was logged or not
   */

  loginUser(email: string, password: string) {
    return this.doRequest<User>('post', `/login`, {
      email: email,
      password: password,
    });
  }

  /**
   * @param id Id of the user
   * @returns User with the given id
   */

  getUserProfile(id: number) {
    return this.doRequest<User>('get', `/users/${id}/profile`);
  }

  /**
   * @param username Username of the user
   * @returns User with the given username
   */
  getUserProfileWithUsername(username: string) {
    return this.doRequest<User>('get', `/users/${username}/profile`);
  }
}
