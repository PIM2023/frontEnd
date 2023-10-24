import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private postService: PostService) {}

  ngOnInit() {}

  async post() {
    const picture = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      saveToGallery: true,
      source: CameraSource.Prompt,
    });
    // this.postService.post('text', 'image', new Date(), 'user').subscribe(() => {
    //   console.log('posted');
    // });
  }

  onWillDismiss(ev: any) {
    console.log(ev);
  }

  cancel() {
    console.log('cancel');
  }

  confirm() {
    console.log('confirm');
    this.post();
  }
}
