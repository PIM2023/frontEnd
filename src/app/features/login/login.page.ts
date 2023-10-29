import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  LoadingController,
  NavController,
} from '@ionic/angular';
import { UserService } from 'src/app/core/services/user/user.service';

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
    private userService: UserService
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
    this.userService
      .login(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .subscribe((response) => {
        console.log('response', response);
      });
  }

  goTo(dest:string, extras?: any){
    this.navCtrl.navigateRoot(dest);
  }

}
