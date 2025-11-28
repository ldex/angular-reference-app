import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <h3>Contact Us</h3>
    <div>
      <div>
        <label>Message: </label>
      </div>
      <div>
        <textarea [(ngModel)]="message" rows="2" cols="25" [disabled]="sending"></textarea>
      </div>
    </div>
    <p>
    @if (!sending) {
        <button (click)="send()">Send</button>
        <button (click)="cancel()">Cancel</button>
    } @else {
      <div class="details">
        {{ details }}
      </div>
    }
    </p>
  `,
  styles: `
    :host {
      position: absolute;
      top: 10%;
      right: 10%;
      background-color: #f637e3;
      padding: 20px;
      display: block;
      border-radius: 8px;
      border: solid 2px #5c44e4;
    }

    label {
      color: white
    }

    button {
      margin-right: 6px;
    }

    .details {
      font-weight: bold;
      color: black;
    }
    `,
  imports: [FormsModule],
})
export class ComposeMessage {
  details: string;
  sending = false;
  message: string = '';

  constructor(private router: Router) {}

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.clearSideOutlet();
    }, 1000);
  }

  cancel() {
    this.clearSideOutlet();
  }

  clearSideOutlet() {
    // Providing a `null` value to the named outlet
    // clears the content of the side outlet
    this.router.navigate([{ outlets: { side: null } }]);
  }
}
