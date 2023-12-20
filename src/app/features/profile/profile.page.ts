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
  avatar!: string;
  bio!: string;
  instagram!: string;
  twitter!: string;
  pinterest!: string;
  isFollowing = false;

  outfits: any = [];

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }

  outfits = [
    {
      imageUrl:
        'https://images.hola.com/imagenes/mascotas/20210217184541/gatos-gestos-lenguaje-significado/0-922-380/gatos-gestos-m.jpg?tx=w_680',
      description: '“i’m a cool football player”',
    },
    {
      imageUrl:
        'https://images.hola.com/imagenes/mascotas/20210217184541/gatos-gestos-lenguaje-significado/0-922-380/gatos-gestos-m.jpg?tx=w_680',
      description: '“i’m a cool football player”',
    },
    {
      imageUrl:
        'https://images.hola.com/imagenes/mascotas/20210217184541/gatos-gestos-lenguaje-significado/0-922-380/gatos-gestos-m.jpg?tx=w_680',
      description: '“i’m a cool football player”',
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
    console.warn('');
    console.log(this.userSignal());
    this.populateProfile();
  }

  goTo(dest: string, extras?: any) {
    this.navCtrl.navigateForward(['profile', dest]);
  }

  populateProfile() {
    const user = this.userSignal();

    this.username = user.username;
    this.avatar = user.profile.avatar;
    this.bio = user.profile.description;
    this.instagram = user.profile.instagram;
    this.twitter = user.profile.twitter;
    this.pinterest = user.profile.pinterest;

    //Hacer llamada para obtener todoso los posts
  }
}
