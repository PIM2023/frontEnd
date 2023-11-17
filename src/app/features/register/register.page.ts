import { Component, OnInit, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ToastService } from 'src/app/shared/utils/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  termsRead = false;
  userSignal: WritableSignal<any>;
  check = document.querySelector('#condition');
  loading = this.loadingCtrl.create({
    message: 'Registrando la cuenta...',
  });
  constructor(
    private readonly fb: FormBuilder,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private userService: UserService,
    private signalsService: SignalsService,
    private toastService: ToastService
  ) {
    this.checkForm().then(() => this.checkboxListener());
    this.userSignal = this.signalsService.getUserSignal();
  }

  ngOnInit() {}

  async checkForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      bornDate: ['', Validators.required],
      height: [''],
      weight: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
      termsAgreed: [false, Validators.requiredTrue],
    });
  }

  async checkboxListener() {
    this.registerForm.get('termsAgreed')?.valueChanges.subscribe((value) => {
      if (this.registerForm.get('termsAgreed')!.value && !this.termsRead) {
        this.presentAlert();
      }
    });
  }

  async showLoading() {
    (await this.loading).present();
  }

  async presentAlert() {
    const check = document.querySelector('#condition');
    const alert = await this.alertController.create({
      header: 'Términos y Condiciones de uso',
      buttons: [
        {
          text: 'Cancelar',
          handler: async () => {
            this.registerForm.value.termsAgreed = false;
            (<any>check).checked = false;
            alert.dismiss();
          },
        },
        {
          text: 'Acepto',
          handler: async () => {
            this.termsRead = true;
            alert.dismiss();
            (<any>check).checked = true;
          },
        },
      ],
      message: `Al registrarte, aceptas los términos y condiciones de uso de la aplicación. \n
        Los datos que nos proporciones serán tratados de forma confidencial y no serán compartidos con terceros. \n
        Solo usaremos tus datos para almacenarlos temporalmente en el almacenamiento local del navegador para permitir que sigas con la sesión iniciada al recargar la página \n`,
    });

    alert.present();
  }

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
          this.navCtrl.navigateRoot('home');
        }
      });
  }

  goTo(dest: string, extras?: any) {
    this.navCtrl.navigateRoot(dest);
  }
}
