import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonIcon, IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainPage implements OnInit {
  @ViewChild('tabs') tabs!: IonTabs;
  @ViewChild('homeIcon') homeIcon!: IonIcon;
  @ViewChild('calendarIcon') calendarIcon!: IonIcon;
  @ViewChild('profileIcon') profileIcon!: IonIcon;
  @ViewChild('searchIcon') searchIcon!: IonIcon;
  constructor() {}

  ngOnInit() {}

  tabsWillChange(event: any) {
    this.homeIcon.src =
      event.tab !== 'home'
        ? '../../../assets/icons/ic-home.svg'
        : '../../../assets/icons/ic-home-bold.svg';
    this.calendarIcon.src =
      event.tab !== 'calendar'
        ? '../../../assets/icons/ic-calendar.svg'
        : '../../../assets/icons/ic-calendar-bold.svg';
    this.profileIcon.src =
      event.tab !== 'profile'
        ? '../../../assets/icons/ic-profile.svg'
        : '../../../assets/icons/ic-profile-bold.svg';
    this.searchIcon.src =
      event.tab !== 'search'
        ? '../../../assets/icons/ic-search.svg'
        : '../../../assets/icons/ic-search-bold.svg';
  }
}
