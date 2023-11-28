import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CalendarComponent,
  CalendarMode,
  QueryMode,
  Step,
} from 'ionic2-calendar';
import { catchError, of } from 'rxjs';
import { CalendarEvent } from 'src/app/core/models/calendar';
import { User } from 'src/app/core/models/user';
import { CalendarService } from 'src/app/core/services/calendar/calendar.service';
import { SignalsService } from 'src/app/core/services/signals/signals.service';
import { ToastService } from 'src/app/shared/utils/toast.service';

@Component({
  selector: 'my-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
  currentEvents: any[] = [];
  user: User;
  @ViewChild(CalendarComponent) myCalendar!: CalendarComponent;

  constructor(
    private calendarService: CalendarService,
    private toastService: ToastService,
    private signalsService: SignalsService
  ) {
    this.isToday = false;
    this.user = this.signalsService.getUserSignal()();
  }

  eventSource: any = [];
  viewTitle: any;

  isToday: boolean;
  calendar = {
    mode: 'month' as CalendarMode,
    queryMode: 'local' as QueryMode,
    step: 30 as Step,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      },
    },
    formatDay: "'Day' dd",
    formatDayHeader: "'Day' EEE",
    formatDayTitle: "'Day' MMMM dd, yyyy",
    formatWeekTitle: "'Week' w",
    formatWeekViewDayHeader: "'Day' EEE d",
    formatHourColumn: "'hour' ha",
    showEventDetail: false,
    startingDayMonth: 1,
    startingDayWeek: 1,
    allDayLabel: 'testallday',
    noEventsLabel: 'No hay ningun post creado este día',
    timeInterval: 15,
    autoSelect: false,
    locale: 'es-ES',
    dir: 'rtl',
    scrollToHour: 3,
    preserveScrollPosition: true,
    lockSwipeToPrev: true,
    lockSwipeToNext: true,
    lockSwipes: true,
    sliderOptions: {
      spaceBetween: 10,
    },
  };

  ionViewWillEnter() {
    this.getEvents();
  }

  getEvents() {
    this.calendarService
      .getAllPostsCreatedByUser(this.user.id)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response) => {
        if (response.error) {
          console.warn('error: ', response);
          this.toastService.presentToast(response.error.message);
          return;
        }
        console.log('response: ', response);
        const events: CalendarEvent[] = [];
        response.forEach((date: string, index: number) => {
          const event: CalendarEvent = {
            title: 'Eventasdasdasd - ' + index,
            startTime: new Date(date),
            endTime: new Date(date),
            allDay: false,
          };
          events.push(event);
        });
        this.eventSource = events;
      });
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title;
    console.log(
      'view title changed: ' + title + ', this.viewTitle: ' + this.viewTitle
    );
  }

  onEventSelected(event: any) {
    console.log(
      'Event selected:' +
        event.startTime +
        '-' +
        event.endTime +
        ',' +
        event.title
    );
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev: any) {
    console.log('EV: ', ev);
    this.calendarService
      .getCreatedPostsByDate(this.user.id, ev.selectedTime)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response) => {
        if (response.error) {
          console.warn('error: ', response);
          this.toastService.presentToast(response.error.message);
          return;
        }
        console.log('response: ', response);
        this.currentEvents = response;
      });
  }

  onCurrentDateChanged(ev: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    ev.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === ev.getTime();
  }

  onDayHeaderSelected = (ev: {
    selectedTime: Date;
    events: any[];
    disabled: boolean;
  }) => {
    console.log(
      'Selected day: ' +
        ev.selectedTime +
        ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) +
        ', disabled: ' +
        ev.disabled
    );
  };

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}
