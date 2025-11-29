import { Component, effect, inject, signal } from '@angular/core';
import { NotificationService } from '../core/notification-service';

@Component({
    selector: 'app-notification',
    template: `
    @if (notification(); as notification) {
        @if (notification.isError && showNotification()) {
            <p style="border: 3px solid red; color: black; max-width: 500px; padding:10px; background-color: #df9292;clear:both">
            <b>Error:</b> {{ notification.message }} <br />
            <b>Page:</b> {{ notification.location }}
            <button (click)="clear()" style="float:right;">Clear</button>
            </p>
        }
        @if (!notification.isError && showNotification()) {
            <p style="border: 3px solid rgba(55, 55, 255, 0.815); color: black; max-width: 500px; padding:10px; background-color: #c7d2ff;clear:both">
            <b>Info:</b> {{ notification.message }}
            <button (click)="clear()" style="float:right;">Clear</button>
            </p>
        }
    }
    `,
})
export class AppNotification {
    private notificationService = inject(NotificationService)

    notification = this.notificationService.notification;
    showNotification = signal(true);

    clear() {
        this.showNotification.set(false)
    }

    constructor() {
        effect(() => {
            if(this.notification() != null) this.showNotification.set(true)
        })
    }
}