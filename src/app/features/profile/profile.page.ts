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
  email!: string;
  firstname!: string;
  lastname!: string;
  height!: string;
  weight!: string;
  borndate!: string;

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.username = "Yoy"
    this.email = "yoy@upv.es"
    this.firstname = "Youcef"
    this.lastname = "Benavente"
    this.height = "185"
    this.weight = "82"
    this.borndate = "11/09/2001"
  }

  goTo(dest:string, extras?: any){
    this.navCtrl.navigateRoot(dest);
  }

}
