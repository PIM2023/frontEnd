import { Component, OnInit, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { UserService } from 'src/app/core/services/user/user.service';

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
    private signalsService: SignalsService
  ) {
    this.checkForm().then(() => this.checkboxListener());
    this.userSignal = this.signalsService.getUserSignal();
  }

  ngOnInit() {
    this.userService.register('a', 'b', 'c', 'd', 'e', new Date()).subscribe(
      (response) => {
        console.log('response', response);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

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
    console.log('CHECKBOX LISTENER');
    const check = document.querySelector('#condition');
    this.registerForm.get('termsAgreed')?.valueChanges.subscribe((value) => {
      if (this.registerForm.get('termsAgreed')!.value && !this.termsRead) {
        console.log('ahora');
        this.registerForm.value.termsAgreed = false;
        this.presentAlert();
      }
    });
  }

  async showLoading() {
    (await this.loading).present();
  }

  async presentAlert() {
    const check = document.querySelector('#condition');
    console.log('check', check);
    const alert = await this.alertController.create({
      header: 'Términos y Condiciones de uso',
      buttons: [
        {
          text: 'Cancelar',
          handler: async () => {
            this.registerForm.value.termsAgreed = false;
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
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus orci, bibendum quis nisl ut, tincidunt maximus lorem. Nam nec tincidunt ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur eget porttitor urna. Proin ornare egestas tempus. Quisque vel sodales sapien. Aenean eget lobortis nulla.',
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
        this.registerForm.value.avatar,
        this.registerForm.value.height,
        this.registerForm.value.weight
      )
      .subscribe((response) => {
        console.log('response', response);
      });
  }

  goTo(dest: string, extras?: any) {
    this.navCtrl.navigateRoot('login');
  }
}
