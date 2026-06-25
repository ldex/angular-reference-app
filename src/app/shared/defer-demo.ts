import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BigDemo } from "./big";

@Component({
  selector: 'app-contact',
  imports: [FormsModule, BigDemo],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <h2>@Defer Demo</h2>
    <div style="margin-top: 40px">
    <h3>Scroll down to trigger the Big Component deferred loading</h3>
      <ul>
        @for (product of products; track product.id) {
          <li>
            <strong>{{ product.name }}</strong> - \${{ product.price }}
          </li>
        }
      </ul>

      <div>
        <!-- Also try: @defer (on timer(3s); prefetch on timer(2s)) { -->
        @defer (on viewport) {
          <big-component />
        }
        @placeholder (minimum 1s) {
          <div>Big component placeholder</div>
        }
        @loading (after 500ms; minimum 500ms) {
          <div class="loading"></div>
        } @error {
          Error loading the component
        }
        </div>

    </div>
  `,
})
export class DeferDemo {
    products = [];
    productNames = [
      'Laptop', 'Monitor', 'Keyboard', 'Mouse', 'Headphones',
      'Webcam', 'Microphone', 'USB Hub', 'External SSD', 'Docking Station',
      'Mechanical Keyboard', 'Gaming Mouse', 'Monitor Stand', 'Laptop Stand', 'Desk Lamp',
      'USB-C Cable', 'HDMI Cable', 'Power Bank', 'Phone Case', 'Screen Protector',
      'Tablet', 'Stylus Pen', 'Keyboard Case', 'Mouse Pad', 'Speaker',
      'Router', 'Network Switch', 'Ethernet Cable', 'WiFi Extender', 'Smart Hub',
      'Smart Light', 'Smart Plug', 'Smart Lock', 'Security Camera', 'Doorbell Camera',
      'Smartwatch', 'Fitness Tracker', 'Bluetooth Speaker', 'Wireless Charger', 'Phone Mount',
      'Camera', 'Lens', 'Tripod', 'Ring Light', 'Memory Card',
      'External Hard Drive', 'SSD Enclosure', 'Cable Organizer', 'Phone Holder', 'Desk Organizer'
    ];

    constructor() {
      for (let i = 1; i <= 50; i++) {
        this.products.push({
          id: i,
          name: `${this.productNames[(i - 1) % this.productNames.length]} ${i}`,
          description: `High-quality product with excellent features and reliable performance.`,
          discontinued: i % 15 === 0,
          fixedPrice: i % 3 === 0,
          price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
          modifiedDate: new Date(),
          imageUrl: `https://via.placeholder.com/150?text=Product+${i}`
        });
      }
    }
}
