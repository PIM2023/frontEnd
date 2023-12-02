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
  userFound: boolean = false;
  loading: boolean = true;

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
}
