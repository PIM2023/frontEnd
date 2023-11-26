import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../base/repository.repository';
import { Post, PostCreated } from '../../models/post';

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
   * @param userId Id of the user that posted the post
   * @param etiquetas Tag of the post
   * @returns Observable that tells if the post was posted or not
   */
  post(text: string, image: string, userId: number, etiquetas: string[]) {
    return this.doRequest<PostCreated>('post', `/post`, {
      text: text,
      image: image,
      userId: userId,
      etiquetas: etiquetas,
    });
  }

  /**
   *
   * @returns Observable that returns all the posts
   */
  getPosts() {
    return this.doRequest<Post[]>('get', '/post');
  }

  /**
   *
   * @param postId Id of the post to edit
   * @param text New text of the post
   * @returns Observable that tells if the post was edited or not
   */
  editPost(postId: number, text: string) {
    return this.doRequest<Post>('put', `/post/${postId}`, {
      text: text,
    });
  }
}