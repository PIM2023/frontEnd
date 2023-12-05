import { Component, OnInit, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
export class SettingsComponent implements OnInit {
  settingsForm!: FormGroup;
  userSignal: WritableSignal<any>;

  constructor(
    private readonly fb: FormBuilder,
    private navCtrl: NavController,
    private userService: UserService,
    private signalsService: SignalsService,
    private toastService: ToastService
  ) {
    this.checkForm();
    this.userSignal = this.signalsService.getUserSignal();
  }

  ngOnInit() {}

  async checkForm() {
    this.settingsForm = this.fb.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      bornDate: [''],
      height: [''],
      weight: [''],
      email: [
        '',
        [
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [''],
    });
  }

  onRegister() {
    this.userService
      .register(
        this.settingsForm.value.username,
        this.settingsForm.value.email,
        this.settingsForm.value.password,
        this.settingsForm.value.firstName,
        this.settingsForm.value.lastName,
        this.settingsForm.value.bornDate,
        this.settingsForm.value.avatar ?? null,
        this.settingsForm.value.height ?? null,
        this.settingsForm.value.weight ?? null
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

  onEditUser() {
    this.userService
      .updateUserProfile(
        this.userSignal().id,
        this.settingsForm.value.username ?? null,
        this.settingsForm.value.email ?? null,
        this.settingsForm.value.password ?? null,
        this.settingsForm.value.firstName ?? null,
        this.settingsForm.value.lastName ?? null,
        this.settingsForm.value.bornDate ?? null,
        this.settingsForm.value.avatar ?? null,
        this.settingsForm.value.height ?? null,
        this.settingsForm.value.weight ?? null
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
