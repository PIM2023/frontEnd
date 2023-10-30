import { Component, OnInit, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NavController,
} from '@ionic/angular';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ToastService } from 'src/app/shared/utils/toast.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {
  registerForm!: FormGroup;
  userSignal: WritableSignal<any>;

  constructor(
    private readonly fb: FormBuilder,
    private navCtrl: NavController,
    private userService: UserService,
    private signalsService: SignalsService,
    private toastService: ToastService
  ) { 
    this.userSignal = this.signalsService.getUserSignal();
  }

  ngOnInit() {}

  onRegister() {
    this.userService
      .register(
        this.registerForm.value.username,
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.firstName,
        this.registerForm.value.lastName,
        this.registerForm.value.bornDate,
        this.registerForm.value.avatar ?? null,
        this.registerForm.value.height ?? null,
        this.registerForm.value.weight ?? null
      )
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response) => {
        if (response.error)
          this.toastService.presentToast(response.error.message);
        else {
          //mi usuario, se ha de cambiar por response
          this.userSignal.set(response);
          this.navCtrl.navigateRoot('profile');
        }
      });
  }

  goTo(dest: string, extras?: any) {
    this.navCtrl.navigateRoot(dest);
  }

}
