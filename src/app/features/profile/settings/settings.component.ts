import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private navCtrl: NavController,
  ) { 
  }

  ngOnInit() {}

  goTo(dest: string, extras?: any) {
    this.navCtrl.navigateRoot(dest);
  }

}
