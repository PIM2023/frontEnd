import { Component, OnInit, WritableSignal } from '@angular/core';

import { NavController } from '@ionic/angular';
import { SignalsService } from 'src/app/core/services/signals/signals.service';

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

  userSignal: WritableSignal<any>;

  constructor(
    private navCtrl: NavController,
    private signalsService: SignalsService
  ) {
    this.userSignal = this.signalsService.getUserSignal();
  }

  ngOnInit() {
    this.populateProfile();
  }

  goTo(dest: string, extras?: any) {
    this.navCtrl.navigateForward(['profile', dest]);
  }

  populateProfile() {
    const user = this.userSignal();

    this.username = user.username;
    this.email = user.email;
    this.firstname = user.firstName;
    this.lastname = user.lastName;
    this.height = user.height;
    this.weight = user.weight;
    this.borndate = user.bornDate;
  }
}
