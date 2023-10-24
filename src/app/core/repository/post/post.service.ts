import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../base/repository.repository';

@Injectable({
  providedIn: 'root',
})
export class PostRepository extends Repository {
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * This method is used to post a post
   * @param text Text of the post
   * @param image Image of the post
   * @param createdAt Created at of the post
   * @param user User that posts
   * @returns Observable that tells if the post was posted or not
   */
  post(text: string, image: string, createdAt: Date, user: any) {
    return this.doRequest<any>('post', `/post`, {
      params: {
        text: text,
        image: image,
        createdAt: createdAt,
        updatedAt: createdAt,
        comments: [],
        user: user,
      },
    });
  }
}
