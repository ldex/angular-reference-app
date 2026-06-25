import { isPlatformBrowser } from '@angular/common';
import { inject, Service, PLATFORM_ID, signal } from '@angular/core';
import { fromEvent, merge, of, map } from 'rxjs';

@Service()
export class NetworkStatusService {
    private readonly platform = inject(PLATFORM_ID);

    private online = signal(true);
    public readonly isOnline = this.online.asReadonly();

    constructor() {
      if (isPlatformBrowser(this.platform)) { // Runs only client side (SSR is enabled on this app)
        merge(
            fromEvent<boolean>(window, "offline").pipe(map(() => false)),
            fromEvent<boolean>(window, "online").pipe(map(() => true)),
            of<boolean>(navigator.onLine)
        )
        .subscribe(online => this.online.set(online));
      }
    }
}
