import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../product-service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

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

  constructor() {
    this.titleService.setTitle(`Product Details for ${this.product()?.name}`);
  }

  private productFromResolver = toSignal(this.route.data);
  protected readonly product = computed(() => this.productFromResolver().product);

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }
}
