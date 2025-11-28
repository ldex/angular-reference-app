import { Component, computed, inject, signal, VERSION } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth-service';
import { debounceTime, filter, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NetworkStatusService } from './core/network-status-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './app.html'
})
export class App {
  private router = inject(Router);
  private authService = inject(AuthService);
  private networkService = inject(NetworkStatusService);

  protected readonly title = signal('Angular Store');
  protected readonly version = signal(VERSION.full);
  protected readonly isLoggedIn = this.authService.isLoggedIn;
  protected readonly isOnline = this.networkService.isOnline;

  private loading$ = this.router.events.pipe(
    filter(
      (e) =>
        e instanceof NavigationStart ||
        e instanceof NavigationEnd ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError
    ),
    debounceTime(50), // if navigation takes more than 50ms, show loading indicator
    map((e) => e instanceof NavigationStart),
    startWith(false)
  );

  protected readonly isLoading = toSignal(this.loading$);

  login() {
    this.router.navigateByUrl("/login");
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/home");
  }
}
