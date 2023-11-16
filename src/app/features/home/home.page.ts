import { Component, OnInit, ViewChild, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonModal } from '@ionic/angular';
import { catchError, of } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { User } from 'src/app/core/models/user';
import { PostService } from 'src/app/core/services/post/post.service';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { ToastService } from 'src/app/shared/utils/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  img!: string;
  description!: string;
  state: any;
  userSignal: WritableSignal<User>;
  posts: Post[] = [];
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private postService: PostService,
    private toastService: ToastService,
    private router: Router,
    private signalsService: SignalsService
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.userSignal = this.signalsService.getUserSignal();
    console.log('user', this.userSignal);
    console.log('userSignal()', this.userSignal());
  }

  ngOnInit() {
    this.getPosts();
  }

  async post() {
    this.postService
      .post(this.description, this.img, this.userSignal().id)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response) => {
        if (response.error)
          this.toastService.presentToast(response.error.message);
        else {
          console.warn('LO QUE ENVIO ES: ', this.img);
          console.log('LO QUE RECIBO DE LA RESPONSE ES: ', response);
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
        if (response.error)
          this.toastService.presentToast(response.error.message);
        else {
          console.log('LO QUE ME LLEGA DE LOS POSTS ES ESTO: ', response);
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
    } catch (_) {
      this.toastService.presentToast(
        'Parece que ha habido un problema al seleccionar la foto'
      );
    }
  }

  cancel() {
    console.warn('JORGE MIRA AQUI ABAJO');
    console.log(this.img);
    console.warn('JORGE MIRA AQUI ARRIBA');
    this.modal.dismiss();
  }

  goTo(dest: string, extras?: any) {
    this.router.navigate([dest], { state: extras });
  }

  async confirm() {
    if (!this.img) {
      this.toastService.presentToast('Debes seleccionar una imagen');
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
