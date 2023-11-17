import { Component, WritableSignal, signal } from '@angular/core';
import { SignalsService } from './core/services/signals/signals.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public userSignal: WritableSignal<any> = signal({});
  constructor(private signalsService: SignalsService) {
    this.signalsService.setUserSignal(this.userSignal);
  }
}
