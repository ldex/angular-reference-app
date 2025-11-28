import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkStatusService {

    private online = signal(true);
    public readonly isOnline = this.online.asReadonly();

   // private isOnlineSubject = new BehaviorSubject<boolean>(true);
  //  isOnline$: Observable<boolean> = this.isOnlineSubject.asObservable();

    constructor() {
        merge(
            fromEvent<boolean>(window, "offline").pipe(map(() => false)),
            fromEvent<boolean>(window, "online").pipe(map(() => true)),
            of<boolean>(navigator.onLine)
        )
        .subscribe(online => this.online.set(online));
    }
}
