import { Injectable } from '@angular/core';
import { PostRepository } from '../../repository/post/post.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private repo: PostRepository) {}

  /**
   * This method is used to post a post
   * @param text Text of the post
   * @param image Image of the post
   * @param createdAt Created at of the post
   * @param user User that posts
   * @returns Observable that tells if the post was posted or not
   */
  public post(
    text: string,
    image: string,
    createdAt: Date | string,
    user: any
  ) {
    return this.repo.post(text, image, createdAt, user);
  }
}
