import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { PostService } from 'src/app/core/services/post/post.service';
import { ToastService } from 'src/app/shared/utils/toast.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  state: any;
  post!: Post;
  loading: boolean = true;
  username!: string;
  uploadDate!: string;
  description!: string;
  isLiked: boolean = false;

  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.getPost();
  }

  ngOnInit() {}

  getPost() {
    if (this.state) {
      this.post = this.state.post;
      this.loading = false;
      return;
    }
    const postId = this.route.snapshot.paramMap.get('id');
    this.getPostById(+postId!);
  }

  getPostById(postId: number) {
    this.postService
      .getPostById(postId)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response) => {
        if (response.error) {
          this.toastService.presentToast(response.error.message);
          this.loading = false;
          return;
        }
        this.post = response;
        console.warn(this.post);
        this.loading = false;
      });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  copyUrlToPost() {
    navigator.clipboard.writeText(
      'https://clout-pin.web.app/post/${this.post.id}'
    );
    this.toastService.presentToast('URL copiada al portapapeles');
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
    // this.isLiked = !this.isLiked;
    // this.post.likes += this.isLiked ? 1 : -1;
  }
}
