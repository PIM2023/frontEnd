import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { ToastService } from 'src/app/shared/utils/toast.service';

@Component({
  selector: 'app-profile-following',
  templateUrl: './profile-following.page.html',
  styleUrls: ['./profile-following.page.scss'],
})
export class ProfileFollowingPage implements OnInit {
  //userSignal: WritableSignal<any>;
  followingList: any[];

  constructor(
    private navCtrl: NavController,
    private signalsService: SignalsService,
    private toastService: ToastService
  ) {
    //this.userSignal = this.signalsService.getUserSignal();
    this.followingList = [];
  }

  ngOnInit() {}

  goToProfileSettings() {
    this.navCtrl.navigateBack(['profile/settings']);
  }

  unfollow(id: number) {
    this.followingList = this.followingList.filter((x) => x.id !== id);
    //Quitar el usuario de la lista de back
  }
}
