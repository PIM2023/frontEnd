import { Injectable } from '@angular/core';
import { UserRepository } from '../../repository/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private repo: UserRepository) {}

  /**
   * This method is used to register a user
   * @param username Username of the user
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
  public register(
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    bornDate: Date,
    avatar?: any,
    height?: number,
    weight?: number
  ) {
    return this.repo.registerUser(
      username,
      email,
      password,
      firstName,
      lastName,
      bornDate,
      avatar,
      height,
      weight
    );
  }

  /**
   * This method is used to login a user
   * @param email Email of the user
   * @param password Password of the user
   * @returns Observable that tells if the user was logged or not
   */
  public login(
    email: string,
    password: string,
  ) {
    return this.repo.loginUser(
      email,
      password
    );
  }

  public getUserById(
    id: number
  ) {
    return this.repo.getUserById(
      id
    );
  }
}
