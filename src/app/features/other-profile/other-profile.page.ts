import { Component, OnInit } from '@angular/core';
import {
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.page.html',
  styleUrls: ['./other-profile.page.scss'],
})
export class OtherProfilePage implements OnInit {

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
