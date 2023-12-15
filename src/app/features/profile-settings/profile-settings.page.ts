import { Component, OnInit, WritableSignal } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NavController } from '@ionic/angular';
import { get } from 'cypress/types/lodash';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { ToastService } from 'src/app/shared/utils/toast.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
})
export class ProfileSettingsPage implements OnInit {
  username!: string;
  name!: string;
  pronouns!: string;
  bio!: string;
  private!: boolean;
  instagram_username!: string;
  twitter_username!: string;
  pinterest_username!: string;
  img!: string;

  userSignal: WritableSignal<any>;

  constructor(
    private navCtrl: NavController,
    private signalsService: SignalsService,
    private toastService: ToastService,
    private alertController: AlertController
  ) {
    this.userSignal = this.signalsService.getUserSignal();
  }

  ngOnInit() {
    this.populateProfileSettings();
  }

  populateProfileSettings() {
    const user = this.userSignal();
    this.username = user.username;
    this.name = user.name;
    this.pronouns = user.pronouns;
    this.bio = user.bio;
    this.private = user.private;
    this.instagram_username = user.instagram_username;
    this.twitter_username = user.twitter_username;
    this.pinterest_username = user.pinterest_username;
    this.img = user.img;
    if (this.img !== '') {
      const avatar = document.getElementById('avatar') as HTMLImageElement;
      avatar.src = this.img;
    }
  }

  async createAlert(socialSiteName: string) {
    const alert = await this.alertController.create({
      header: 'Put your ' + socialSiteName + ' username',
      inputs: [
        {
          name: 'input1',
          type: 'text',
          placeholder:
            socialSiteName == 'instagram'
              ? this.instagram_username
              : socialSiteName == 'twitter'
              ? this.twitter_username
              : socialSiteName == 'pinterest'
              ? this.pinterest_username
              : '',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //Do nothing
          },
        },
        {
          text: 'Accept',
          handler: (alertData) => {
            console.log(alertData.input1);
            if (alertData.input1 !== '') {
              if (socialSiteName === 'intagram') {
                this.setInstagramUsername(alertData.input1);
              } else if (socialSiteName === 'twitter') {
                this.setTwitterUsername(alertData.input1);
              } else if (socialSiteName === 'pinterest') {
                this.setPinterestUsername(alertData.input1);
              }
            }
          },
        },
      ],
    });
    await alert.present();
  }

  editUsername() {
    const usernameInput = document.getElementById(
      'username'
    ) as HTMLInputElement;
    const saveButton = document.getElementById(
      'edit-username'
    ) as HTMLIonIconElement;

    if (usernameInput.readOnly) {
      usernameInput.readOnly = false;
      saveButton.src = '../../../assets/icons/ic-save.svg';
    } else {
      usernameInput.readOnly = true;
      saveButton.src = '../../../assets/icons/ic-edit.svg';
      //realizar la llamada a la api para actualizar el nombre de usuario
    }
  }

  editName() {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const saveButton = document.getElementById(
      'edit-name'
    ) as HTMLIonIconElement;

    if (nameInput.readOnly) {
      nameInput.readOnly = false;
      saveButton.src = '../../../assets/icons/ic-save.svg';
    } else {
      nameInput.readOnly = true;
      saveButton.src = '../../../assets/icons/ic-edit.svg';
      //realizar la llamada a la api para actualizar el nombre
    }
  }

  editPronouns() {
    const pronounsInput = document.getElementById(
      'pronouns'
    ) as HTMLInputElement;
    const saveButton = document.getElementById(
      'edit-pronouns'
    ) as HTMLIonIconElement;

    if (pronounsInput.readOnly) {
      pronounsInput.readOnly = false;
      saveButton.src = '../../../assets/icons/ic-save.svg';
    } else {
      pronounsInput.readOnly = true;
      saveButton.src = '../../../assets/icons/ic-edit.svg';
      //realizar la llamada a la api para actualizar los pronombres
    }
  }

  editBio() {
    const bioInput = document.getElementById('bio') as HTMLIonTextareaElement;
    const saveButton = document.getElementById(
      'edit-bio'
    ) as HTMLIonIconElement;

    if (bioInput.readonly) {
      bioInput.readonly = false;
      saveButton.src = '../../../assets/icons/ic-save.svg';
    } else {
      bioInput.readonly = true;
      saveButton.src = '../../../assets/icons/ic-edit.svg';
      //realizar la llamada a la api para actualizar la bio
    }
  }

  setPrivateAccount() {
    const privateAccount = document.getElementById(
      'private-account'
    ) as HTMLIonToggleElement;

    if (privateAccount.checked) {
      //realizar la llamada a la api para actualizar el estado de la cuenta
    } else {
      //realizar la llamada a la api para actualizar el estado de la cuenta
    }
  }

  async setNewProfilePicture() {
    try {
      const picture = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        saveToGallery: true,
        source: CameraSource.Prompt,
      });
      this.img = picture.dataUrl || '';
      console.log('img', this.img);

      const avatar = document.getElementById('avatar') as HTMLImageElement;
      avatar.src = this.img;

      //realizar la llamada a la api para actualizar la foto de perfil
    } catch (_) {
      this.toastService.presentToast(
        'Parece que ha habido un problema al seleccionar la foto'
      );
    }
  }

  goToProfile() {
    this.navCtrl.navigateBack(['profile']);
  }

  goToLikedOutfits() {
    //redirigir a la página de outfits guardados
  }

  goToFollowing() {
    //redirigir a la página de usuarios seguidos
  }

  setInstagramUsername(username: string) {
    //realizar la llamada a la api para actualizar el nombre de usuario de instagram
  }

  setTwitterUsername(username: string) {
    //realizar la llamada a la api para actualizar el nombre de usuario de twitter
  }

  setPinterestUsername(username: string) {
    //realizar la llamada a la api para actualizar el nombre de usuario de pinterest
  }
}
