import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { catchError, of } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { ToastService } from 'src/app/shared/utils/toast.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.page.html',
  styleUrls: ['./other-profile.page.scss'],
})
export class OtherProfilePage implements OnInit {
  username!: string;
  bio!: string;
  instagram_username!: string;
  twitter_username!: string;
  pinterest_username!: string;
  userFound: boolean = false;
  loading: boolean = true;
  isFollowing = false;

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

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService
  ) {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.getProfileWithUsername(this.username);
  }

  ngOnInit() {
    console.warn(this.username);
  }

  goTo(dest: string, extras?: any) {
    this.navCtrl.navigateRoot(dest);
  }

  getProfileWithUsername(username: string) {
    this.userService
      .getUserProfileWithUsername(username)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((res) => {
        if (res.error) {
          console.warn(res.error);
          this.toastService.presentToast(res.error.message);
          this.loading = false;
          return;
        }
        console.warn(res);
        this.userFound = true;
        this.loading = false;
      });
  }

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }
}
