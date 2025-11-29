import { Injectable, signal, Signal } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppNotification } from '../models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private _notification = signal<AppNotification>(null);
  readonly notification: Signal<AppNotification> = this._notification.asReadonly()

  constructor(
      private locationStrategy: LocationStrategy
  ) {}

  notifyMessage(message: string): void {
    let notificationContent:AppNotification = {
        isError: false,
        message: message,
        location: ''
    }
    this.notify(notificationContent);
  }

  notifyError(message: string): void {
    let notificationContent:AppNotification = {
        isError: true,
        message: message,
        location: this.getLocation()
    }
    this.notify(notificationContent);
  }

  private notify(notificationContent:AppNotification): void {
    this._notification.set(notificationContent);
    setTimeout(() => this._notification.set(null), 3000);
  }

  private getLocation(): string {
    return this.locationStrategy instanceof PathLocationStrategy ? this.locationStrategy.path() : '';
  }

}