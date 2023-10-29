import { Component, OnInit, ViewChild, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonModal, ToastController } from '@ionic/angular';
import { catchError, of } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { User } from 'src/app/core/models/user';
import { PostService } from 'src/app/core/services/post/post.service';
import { SignalsService } from 'src/app/core/services/signals/signals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  img!: string;
  description!: string;
  state: any;
  user: WritableSignal<User>;
  posts: Post[] = [];
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private postService: PostService,
    private toastCtrl: ToastController,
    private router: Router,
    private signalsService: SignalsService
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.user = this.signalsService.getUserSignal();
    //TO DO: QUITAR ESTO CUANDO FUNCIONE EL LOGIN
  }

  ngOnInit() {
    this.getPosts();
  }

  async post() {
    this.postService
      .post(this.description, this.img, this.user().id)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response) => {
        if (response.error) this.presentToast(response.error.message);
        else {
          console.log(response);
        }
      });
  }

  async getPosts() {
    this.postService
      .getPosts()
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response) => {
        if (response.error) this.presentToast(response.error.message);
        else {
          this.posts = response;
        }
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
      console.log(this.img);
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

  async refreshPage(ev: any) {
    await this.getPosts();
    ev.target.complete();
  }
}
