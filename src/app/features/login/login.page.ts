import { Component, OnInit, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ToastService } from 'src/app/shared/utils/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  userSignal: WritableSignal<User>;
  check = document.querySelector('#condition');
  loading = this.loadingCtrl.create({
    message: 'Iniciando sesión',
  });

  constructor(
    private readonly fb: FormBuilder,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private userService: UserService,
    private signalsService: SignalsService,
    private toastService: ToastService
  ) {
    this.checkForm();
    this.userSignal = this.signalsService.getUserSignal();
  }

  ngOnInit() {}

  async checkForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  async showLoading() {
    (await this.loading).present();
  }

  onRegister() {
    this.userService
      .login(this.loginForm.value.email, this.loginForm.value.password)
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
          console.log('RES: ', response);
          console.log('userSignal: ', this.userSignal);
          console.log('usersignal(): ', this.userSignal());
          this.userSignal.set(response);
          console.log('usersignal2(): ', this.userSignal());
          this.navCtrl.navigateRoot('home');
        }
      });
  }

  goTo(dest: string, extras?: any) {
    this.navCtrl.navigateRoot(dest);
  }
}
