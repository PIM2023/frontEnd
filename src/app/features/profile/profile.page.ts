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
  bio!: string;
  email!: string;
  firstname!: string;
  lastname!: string;
  height!: string;
  weight!: string;
  borndate!: string;
  instagram_username!: string;
  twitter_username!: string;
  pinterest_username!: string;

  outfits = [
    {
      imageUrl: 'https://images.hola.com/imagenes/mascotas/20210217184541/gatos-gestos-lenguaje-significado/0-922-380/gatos-gestos-m.jpg?tx=w_680',
      description: '“i’m a cool football player”'
    },
    {
      imageUrl: 'https://images.hola.com/imagenes/mascotas/20210217184541/gatos-gestos-lenguaje-significado/0-922-380/gatos-gestos-m.jpg?tx=w_680',
      description: '“i’m a cool football player”'
    },
    {
      imageUrl: 'https://images.hola.com/imagenes/mascotas/20210217184541/gatos-gestos-lenguaje-significado/0-922-380/gatos-gestos-m.jpg?tx=w_680',
      description: '“i’m a cool football player”'
    },
  ];

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
    this.bio = user.bio;
    this.email = user.email;
    this.firstname = user.firstName;
    this.lastname = user.lastName;
    this.height = user.height;
    this.weight = user.weight;
    this.borndate = user.bornDate;
    this.instagram_username = user.instagram_username;
    this.twitter_username = user.twitter_username;
    this.pinterest_username = user.pinterest_username;
  }
}
