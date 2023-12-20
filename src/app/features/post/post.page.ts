import { Component, OnInit, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { PostService } from 'src/app/core/services/post/post.service';
import { ToastService } from 'src/app/shared/utils/toast.service';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  state: any;
  post!: any;
  loading: boolean = true;
  username!: string;
  uploadDate!: string;
  description!: string;
  isLiked: boolean = false;

  userSignal: WritableSignal<any>;
  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private signalsService: SignalsService
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.getPost();
    this.userSignal = this.signalsService.getUserSignal();
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

  goToProfile() {
    this.router.navigate(['/profile', this.userSignal().id]);
  }

  copyUrlToPost() {
    navigator.clipboard.writeText(
      'https://clout-pin.web.app/post/${this.post.id}'
    );
    this.toastService.presentToast('URL copiada al portapapeles');
  }

  toggleLike() {
    //this.isLiked = !this.isLiked;
    // this.isLiked = !this.isLiked;
    // this.post.likes += this.isLiked ? 1 : -1;
    const userId = localStorage.getItem('userId');
    console.log(userId);
    console.log(this.post);
    const postId = this.route.snapshot.paramMap.get('id');
    console.log(postId);

    if (!localStorage.getItem('userId')) {
      this.toastService.presentToast(
        'No puedes dar me gusta a una publicación si no tienes la sesión iniciada'
      );
      return;
    }
    if (!this.isLiked) {
      this.postService
        .likePost(+postId!, +this.userSignal().id)
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
          this.isLiked = true;
          console.warn(this.post);
          this.loading = false;
        });
    } else {
      this.postService
        .dislikePost(+postId!, +this.userSignal().id)
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
          this.isLiked = false;
          console.warn(this.post);
          this.loading = false;
        });
    }
  }
}
