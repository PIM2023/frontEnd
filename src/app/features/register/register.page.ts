import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  termsRead = false;
  check = document.querySelector('#condition');
  loading = this.loadingCtrl.create({
    message: 'Registrando la cuenta...',
  });
  constructor(
    private readonly fb: FormBuilder,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) {
    this.checkForm().then(() => this.checkboxListener());
  }

  ngOnInit() {}

  async checkForm() {
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
      username: ['', Validators.required],
      termsAgreed: [false, Validators.requiredTrue],
    });
  }

  async checkboxListener() {
    console.log('CHECKBOX LISTENER');
    const check = document.querySelector('#condition');
    this.registerForm.get('termsAgreed')?.valueChanges.subscribe((value) => {
      if (this.registerForm.get('termsAgreed')!.value && !this.termsRead) {
        console.log('ahora');
        this.registerForm.setValue({ termsAgreed: false });
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
    console.log('ON REGISTER');
  }

  goTo(dest: string, extras?: any) {
    this.navCtrl.navigateRoot('login');
  }
}
