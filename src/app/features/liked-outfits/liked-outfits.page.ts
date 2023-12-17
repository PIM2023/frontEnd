import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Post } from 'src/app/core/models/post';

@Component({
  selector: 'app-liked-outfits',
  templateUrl: './liked-outfits.page.html',
  styleUrls: ['./liked-outfits.page.scss'],
})
export class LikedOutfitsPage implements OnInit {
  loading: boolean = true;
  likedPosts: any[] = [
    {
      id: 11,
      username: '12usaer',
      text: 'teeeexxxtto',
      image: 'https://api.jorma28j.upv.edu.es/uploads/2/sbjfrot5c2c.png',
      likes: 0,
      comments: [],
    },
    {
      id: 12,
      username: 'marcel',
      text: 'Post de prueba',
      image: 'https://api.jorma28j.upv.edu.es/uploads/5/hcwwpn8ezgo.png',
      likes: 0,
      comments: [],
    },
    {
      id: 13,
      username: 'marcel',
      text: 'Post de prueba',
      image: 'https://api.jorma28j.upv.edu.es/uploads/5/8scwxulqu1.png',
      likes: 0,
      comments: [],
    },
    {
      id: 14,
      username: 'marcel',
      text: 'prueba',
      image: 'https://api.jorma28j.upv.edu.es/uploads/5/9afot372e6k.png',
      likes: 0,
      comments: [],
    },
  ];
  arrayOfArrays: any[][] = [];
  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    //todo: llamar a endpoint
    this.loading = false;
    this.likedPosts.forEach((post, index) => {
      if (index % 3 == 0) {
        this.arrayOfArrays.push([post]);
      } else {
        this.arrayOfArrays[this.arrayOfArrays.length - 1].push(post);
      }
    });
  }

  goToProfile() {
    this.navCtrl.navigateBack(['profile', 'settings']);
  }
}
