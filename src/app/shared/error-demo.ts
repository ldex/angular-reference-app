import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  template: `
    <h2>Errors Demo</h2>
    <p>Try different kind of errors:</p>
    <div style="margin-bottom: 80px;margin-top: 40px">
      <button (click)="code_error()">> Try Code Error</button>
      <br />
      <button (click)="nav_error()">> Try Navigation Error</button>
      <br />
      <button (click)="http_error()">> Try Http Error</button>
    </div>
  `,
})
export class ErrorDemo {
  private router = inject(Router);
  private http = inject(HttpClient);

  code_error(): void {
    throw new Error('App Component has thrown an error!');
  }

  nav_error(): void {
    this.router.navigateByUrl('/this_page_does_not_exist');
  }

  http_error(): void {
    this.http.get('https://run.mocky.io/v3/78c4a834-ff6b-4b35-8ad1-78423870ee1b').subscribe();
  }
}
