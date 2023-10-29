import { Component, OnInit } from '@angular/core';

import {
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username!: string;

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.username = "adadvadadaad"
  }

  goTo(dest:string, extras?: any){
    this.navCtrl.navigateRoot(dest);
  }

}
