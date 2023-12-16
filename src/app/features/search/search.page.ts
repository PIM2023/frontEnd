import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/core/models/user';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { ToastService } from 'src/app/shared/utils/toast.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  currentEvents: any[] = [];

  constructor(
    private navCtrl: NavController,
    private signalsService: SignalsService,
    private toastService: ToastService
  ) {
    this.currentEvents = [];
  }

  ngOnInit() {}

  async searchUser(event: any) {
    const query = event.target.value;
    console.log(query);
    if (query && query.length > 0) {
      // Hacer la llamada
    } else {
      // Hacer la llamada que traiga a todos los ususarios
      //this.currentEvents = [];
    }
  }

  async goToOtherUserProfile(id: number) {
    this.navCtrl.navigateForward(`/profile/${id}`);
  }
}
