import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  IonModal,
  RefresherEventDetail,
  ToastController,
} from '@ionic/angular';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  img!: string;
  description!: string;
  state: any;
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private postService: PostService,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
    this.getPosts();
  }

  async post() {
    const date = this.formatDate(new Date());
    console.warn(date);
    this.postService
      .post(this.description, this.img, date, 'user')
      .subscribe((postResult) => {
        console.log(postResult);
      });
  }

  async getPosts() {
    this.postService.getPosts().subscribe((posts) => {
      console.log(posts);
    });
  }

  async takePicture() {
    try {
      const picture = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        saveToGallery: true,
        source: CameraSource.Prompt,
      });
      this.img = picture.dataUrl || '';
    } catch (_) {
      this.presentToast(
        'Parece que ha habido un problema al seleccionar la foto'
      );
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
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
      this.presentToast('Debes seleccionar una imagen');
      return;
    }
    await this.post();
    this.modal.dismiss();
    this.img = '';
  }

  refreshPage(ev: any) {
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
  }
}
