import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CalendarComponent,
  CalendarMode,
  QueryMode,
  Step,
} from 'ionic2-calendar';

@Component({
  selector: 'my-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
  @ViewChild(CalendarComponent) myCalendar!: CalendarComponent;

  constructor() {
    this.isToday = false;
    this.loadEvents();
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
    noEventsLabel: 'No hay ningun evento',
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

  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }

  loadDynamicEvents() {
    let startTime = new Date('2023-01-20T03:00:40');
    let endTime = new Date('2023-01-22T05:39:22');

    this.eventSource.push({
      title: 'test',
      startTime: startTime,
      endTime: endTime,
      allDay: false,
    });
    this.myCalendar.loadEvents();
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

  changeMode(mode: any) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev: any) {
    console.log(
      'Selected time: ' +
        ev.selectedTime +
        ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) +
        ', disabled: ' +
        ev.disabled
    );
  }

  onCurrentDateChanged(ev: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    ev.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === ev.getTime();
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 100; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    console.warn('events: ', events);
    return events;
  }

  onRangeChanged(ev: any) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
    this.eventSource = this.createRandomEvents();
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