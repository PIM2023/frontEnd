import { Component, OnInit, WritableSignal } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { ToastService } from 'src/app/shared/utils/toast.service';
import { FollowingService } from 'src/app/core/services/following/following.service';
import { catchError, of } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { Following } from 'src/app/core/models/following';

@Component({
  selector: 'app-profile-following',
  templateUrl: './profile-following.page.html',
  styleUrls: ['./profile-following.page.scss'],
})
export class ProfileFollowingPage implements OnInit {
  followingList: Following[] = [];
  userSignal: WritableSignal<User>;

  constructor(
    private navCtrl: NavController,
    private signalsService: SignalsService,
    private toastService: ToastService,
    private followingService: FollowingService
  ) {
    this.userSignal = this.signalsService.getUserSignal();
  }

  ngOnInit() {
    const user = this.userSignal();
    console.log(user.id);
    this.followingService
      .getFollowing(user.id)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        if (response.error) {
          this.toastService.presentToast(
            'Error al obtener los usuarios que sigues'
          );
        } else {
          this.followingList = response;
          console.log(this.followingList);
        }
      });
  }

  goToProfileSettings() {
    this.navCtrl.navigateBack(['profile/settings']);
  }

  goToProfileFollowing(username: string) {
    this.navCtrl.navigateForward(`/profile/name/${username}`);
  }

  unfollow(id: number) {
    //Quitar el usuario de la lista de back
    const user = this.userSignal();

    this.followingService
      .unfollow(id, user.id)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          console.log('Unfollowed');
          this.followingList = this.followingList.filter((x) => x.id !== id);
        } else {
          this.toastService.presentToast('Error');
        }
      });
  }
}
