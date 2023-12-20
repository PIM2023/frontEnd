import { Component, OnInit, WritableSignal } from '@angular/core';
import { PostService } from 'src/app/core/services/post/post.service';
import { NavController } from '@ionic/angular';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { catchError, of } from 'rxjs';
import { ToastService } from 'src/app/shared/utils/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  id!: number;
  username!: string;
  avatar!: string;
  bio!: string;
  instagram!: string;
  twitter!: string;
  pinterest!: string;
  isFollowing = false;

  outfits: any = [];

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }

  userSignal: WritableSignal<any>;

  constructor(
    private navCtrl: NavController,
    private signalsService: SignalsService,
    private postService: PostService,
    private toastService: ToastService
  ) {
    this.userSignal = this.signalsService.getUserSignal();
  }

  ngOnInit() {
    console.warn('');
    console.log(this.userSignal());
    this.populateProfile();
    setTimeout(() => {
      this.getPosts(this.id);
    }, 1000);
  }

  goTo(dest: string, extras?: any) {
    this.navCtrl.navigateForward(['profile', dest]);
  }

  populateProfile() {
    const user = this.userSignal();
    this.id = user.id;
    this.username = user.username;
    this.avatar = user.profile.avatar;
    this.bio = user.profile.description;
    this.instagram = user.profile.instagram;
    this.twitter = user.profile.twitter;
    this.pinterest = user.profile.pinterest;

    //Hacer llamada para obtener todoso los posts
  }

  getPosts(id: number) {
    this.postService
      .getPostsByUserId(id)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        console.log('response', response);
        if (response.error)
          this.toastService.presentToast(response.error.message);
        else {
          this.outfits = response;
          console.log(response);
        }
      });
  }
}
