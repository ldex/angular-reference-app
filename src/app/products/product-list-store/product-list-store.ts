import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, JsonPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { OrderByPipe } from '../orderBy.pipe';
import { Router, RouterLink } from '@angular/router';
import { ProductStore } from '../product-store';

@Component({
  selector: 'app-product-list-store',
  imports: [UpperCasePipe, CurrencyPipe, OrderByPipe, JsonPipe, SlicePipe, RouterLink],
  templateUrl: './product-list-store.html',
  styleUrl: './product-list-store.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListStore {

  private productStore = inject(ProductStore);
  private router = inject(Router);

  protected products = this.productStore.products;
  protected selectedProduct = signal<Product>(undefined);
  protected error = this.productStore.error;
  protected isLoading = this.productStore.isLoading;

  private pageSize = signal(5);
  protected start = signal(0);
  protected end = signal(this.pageSize());
  protected pageNumber = signal(1);

  protected changePage(increment: number) {
    this.pageNumber.update(p => p + increment);
    this.start.update(n => n + increment * this.pageSize());
    this.end.set(this.start() + this.pageSize());
    this.selectedProduct.set(null);
  }

  resetPagination() {
    this.pageSize.set(5)
    this.start.set(0)
    this.end.set(this.pageSize())
    this.pageNumber.set(1)
  }

  protected selectProduct(product: Product) {
    this.selectedProduct.set(product);
    this.router.navigate(['/products', product.id]);
  }

  protected refreshList() {
    this.productStore.forceRefresh()
    this.resetPagination()
  }

  protected loadMore() {
    this.productStore.loadProducts()
  }
}
