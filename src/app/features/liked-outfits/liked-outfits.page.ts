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
  likedPosts: any[] = [];
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
