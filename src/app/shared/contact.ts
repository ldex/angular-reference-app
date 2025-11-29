import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-contact',
    template: `
        <h2>Contact Us</h2>
        <div style="margin-bottom: 80px">
            Our addresses:
            <ul>
                <li>123 Main St, Anytown, USA</li>
                <li>456 Maple Ave, Othertown, USA</li>
            </ul>
            Phone: (123) 456-7890<br/>
            Email: contact@web.com
            <p>
                <button (click)="gotoComposeMessage()">Send a message</button>
            </p>
        </div>
    `,
})
export class Contact {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  gotoComposeMessage() {
    this.router.navigate([{ outlets: { side: ['message']} }], { relativeTo: this.route.parent });
  }

}