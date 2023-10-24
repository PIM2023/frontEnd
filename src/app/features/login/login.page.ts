import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoadingController,
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  check = document.querySelector('#condition');
  loading = this.loadingCtrl.create({
    message: 'Iniciando sesión',
  });

  constructor(
    private readonly fb: FormBuilder,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
  ) {
    this.checkForm();
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
    console.log('ON REGISTER');
  }

  goTo(dest:string, extras?: any){
    this.navCtrl.navigateRoot(dest);
  }

}
