import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonicModule } from '@ionic/angular';
import { CommentsComponent } from '../comments/comments.component';
import { Post } from 'src/app/core/models/post';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { User } from 'src/app/core/models/user';
import { PostService } from 'src/app/core/services/post/post.service';
import { ToastService } from '../../utils/toast.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'post',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, CommentsComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  i: number = 2;
  currentUser: any;
  comments: any[] = [];
  commentsOpen: boolean = false;
  editOpen: boolean = false;
  user!: User;
  isLiked: boolean = false;
  @Input() post!: Post;
  @ViewChild('commentInput', { static: true }) commentInput!: IonInput;
  @ViewChild('postInput') postInput!: IonInput;
  constructor(
    private signalsService: SignalsService,
    private postService: PostService,
    private toastService: ToastService
  ) {
    this.user = this.signalsService.getUserSignal()();
  }

  ngOnInit() {
    console.log('POst', this.post);
    this.post.image = this.post.image.replace('https:/', 'https://');
  }

  goToComments(post: any) {
    console.log('post ', post);
    console.log(this.commentInput.value);
  }

  setOpen(open: boolean) {
    if (this.comments.length == 0) return;
    console.log(open);
    this.commentsOpen = open;
  }

  sendComment() {
    if (this.commentInput.value == '') return;
    this.commentInput.value = '';
  }

  editPost(boolean: boolean) {
    this.editOpen = boolean;
  }

  edit() {
    if (this.postInput.value == '') {
      this.toastService.presentToast('No puedes dejar el campo vacío');
      return;
    }
    this.editOpen = false;
    this.postService
      .editPost(this.post.id, (this.postInput.value as string)!)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((res) => {
        if (res.error) {
          this.toastService.presentToast(res.error.message);
          return;
        } else this.post.text = (this.postInput.value as string)!;
      });
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
    this.post.likes += this.isLiked ? 1 : -1;
  }

  log(post: Post) {
    console.log(post);
  }
}
