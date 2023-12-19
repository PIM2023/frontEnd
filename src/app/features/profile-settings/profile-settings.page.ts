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
  surname!: string;
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
    this.name = user.firstName;
    this.surname = user.lastName;
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
      header: 'Introduce tu nombre de usuario de ' + socialSiteName,
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
      cssClass: 'alertita',
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

    if (usernameInput.value.length < 3 || usernameInput.value.length > 15) {
      this.toastService.presentToast(
        'El nombre de usuario debe tener entre 3 y 15 caracteres'
      );
      this.username = this.userSignal().username;
      usernameInput.value = this.username;
      usernameInput.readOnly = true;
      saveButton.src = '../../../assets/icons/ic-edit.svg';
      return;
    }

    if (usernameInput.readOnly) {
      usernameInput.readOnly = false;
      saveButton.src = '../../../assets/icons/ic-save.svg';
    } else {
      usernameInput.readOnly = true;
      saveButton.src = '../../../assets/icons/ic-edit.svg';
      //realizar la llamada a la api para actualizar el nombre de usuario
    }

    this.userSignal.set({
      ...this.userSignal(),
      username: usernameInput.value,
    });
  }

  editName() {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const saveButton = document.getElementById(
      'edit-name'
    ) as HTMLIonIconElement;

    if (nameInput.value.length < 2 || nameInput.value.length > 30) {
      this.toastService.presentToast(
        'El nombre debe tener entre 2 y 30 caracteres'
      );
      this.name = this.userSignal().firstName;
      nameInput.value = this.name;
      nameInput.readOnly = true;
      saveButton.src = '../../../assets/icons/ic-edit.svg';
      return;
    }

    if (nameInput.readOnly) {
      nameInput.readOnly = false;
      saveButton.src = '../../../assets/icons/ic-save.svg';
    } else {
      nameInput.readOnly = true;
      saveButton.src = '../../../assets/icons/ic-edit.svg';
      //realizar la llamada a la api para actualizar el nombre
    }
    this.userSignal.set({
      ...this.userSignal(),
      firstName: nameInput.value,
    });
  }

  editSurname() {
    const surnameInput = document.getElementById('surname') as HTMLInputElement;
    const saveButton = document.getElementById(
      'edit-surname'
    ) as HTMLIonIconElement;

    if (surnameInput.value.length > 50) {
      this.toastService.presentToast(
        'El apellido debe como máximo 50 caracteres'
      );
      this.surname = this.userSignal().lastName;
      surnameInput.value = this.surname;
      surnameInput.readOnly = true;
      saveButton.src = '../../../assets/icons/ic-edit.svg';
      return;
    }

    if (surnameInput.readOnly) {
      surnameInput.readOnly = false;
      saveButton.src = '../../../assets/icons/ic-save.svg';
    } else {
      surnameInput.readOnly = true;
      saveButton.src = '../../../assets/icons/ic-edit.svg';
      //realizar la llamada a la api para actualizar el nombre
    }

    this.userSignal.set({
      ...this.userSignal(),
      lastName: surnameInput.value,
    });
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

  async setNewProfilePicture() {
    try {
      const picture = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        saveToGallery: true,
        promptLabelHeader: 'Selecciona de donde quieres obtener la foto',
        promptLabelCancel: 'Cancelar',
        promptLabelPicture: 'Hacer foto',
        promptLabelPhoto: 'Seleccionar de la galería',
        source: CameraSource.Prompt,
      });
      this.img = picture.dataUrl || '';
      console.log('img', this.img);

      const avatar = document.getElementById('avatar') as HTMLImageElement;
      avatar.src = this.img;
      this.userSignal.set({
        ...this.userSignal(),
        img: this.img,
      });

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
    this.navCtrl.navigateForward(['profile', 'likes']);
  }

  goToFollowing() {
    //redirigir a la página de usuarios seguidos
    this.navCtrl.navigateForward(['profile', 'following']);
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
