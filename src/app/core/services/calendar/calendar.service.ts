import { Injectable } from '@angular/core';
import { CalendarRepository } from '../../repository/calendar/calendar.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private repo: CalendarRepository) {}

  /**
   * This method is used to get all the posts created by a user
   * @param userId Id of the user
   * @returns Observable that returns all the posts created by a user
   */
  public getAllPostsCreatedByUser(userId: number) {
    return this.repo.getAllPostsCreatedByUser(userId);
  }

  /**
   * This method is used to get all the posts created by a user by date
   * @param userId Id of the user
   * @param date Date of the posts
   * @returns Observable that returns all the posts created by a user by date
   */
  public getCreatedPostsByDate(userId: number, date: Date) {
    return this.repo.getCreatedPostsByDate(userId, date);
  }
}
