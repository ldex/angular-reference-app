import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../product-service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NetworkStatusService } from '../../core/network-status-service';
import { AuthService } from '../../core/auth-service';

@Component({
  selector: 'app-product-details',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private networkService = inject(NetworkStatusService);  private authService = inject(AuthService);

  private readonly isOnline = this.networkService.isOnline;
  private readonly isLoggedin = this.authService.isLoggedIn;
  private productFromResolver = toSignal(this.route.data);
  protected readonly product = computed(() => this.productFromResolver().product);
  protected readonly disableDelete = computed(() => !this.isOnline() || !this.isLoggedin())

  constructor() {
    this.titleService.setTitle(`Product Details for ${this.product()?.name}`);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }
}
