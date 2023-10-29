import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonicModule } from '@ionic/angular';
import { CommentsComponent } from '../comments/comments.component';
import { Post } from 'src/app/core/models/post';

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
  @Input() post!: Post;
  @ViewChild('commentInput', { static: true }) commentInput!: IonInput;
  constructor() {}

  ngOnInit() {
    console.log(this.post);
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
    console.log(this.commentInput.value);
    this.commentInput.value = '';
  }
}
