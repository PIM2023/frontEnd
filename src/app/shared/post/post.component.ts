import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonicModule } from '@ionic/angular';

@Component({
  selector: 'post',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  i: number = 2;
  currentUser: any;
  comments: any;
  @Input() post!: any;
  @ViewChild('commentInput', { static: true }) commentInput!: IonInput;
  constructor() {}

  ngOnInit() {}

  goToComments(post: any) {
    console.log('post ', post);
    console.log(this.commentInput.value);
  }
}
