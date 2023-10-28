import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonModal, ToastController } from '@ionic/angular';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  img!: string;
  description!: string;
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private postService: PostService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async post() {
    const date = this.formatDate(new Date());
    console.warn(date);
    this.postService
      .post(this.description, this.img, date, 'user')
      .subscribe((postResult) => {
        console.log(postResult);
      });
  }

  async takePicture() {
    const picture = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      saveToGallery: true,
      source: CameraSource.Prompt,
    });
    this.img = picture.dataUrl || '';
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Debes seleccionar una imagen',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cancel() {
    this.modal.dismiss();
  }

  async confirm() {
    if (!this.img) {
      this.presentToast();
      return;
    }
    await this.post();
    this.modal.dismiss();
    this.img = '';
  }
}
