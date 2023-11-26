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
   * @param userId Id of the user that posted the post
   * @param etiquetas Tag of the post
   * @returns Observable that tells if the post was posted or not
   */
  public post(text: string, image: string, userId: number, etiquetas: string[]) {
    return this.repo.post(text, image, userId, etiquetas);
  }

  /**
   *
   * @returns Observable that returns all the posts
   */
  public getPosts() {
    return this.repo.getPosts();
  }

  /**
   *
   * @param postId Id of the post to edit
   * @param text New text of the post
   * @returns Observable that tells if the post was edited or not
   */
  public editPost(postId: number, text: string) {
    return this.repo.editPost(postId, text);
  }
}