import { inject } from '@angular/core';
import {
  signalStore,
  withState,
  patchState,
  withMethods,
  withHooks,
  withProps,
} from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, pipe, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { NotificationService } from '../core/notification-service';
import { ApiService } from '../core/api-service';
import { HttpErrorResponse } from '@angular/common/http';

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withDevtools('products'),
  withState({
    products: [] as Product[],
    isLoading: false,
    error: undefined,
    _pageToLoad: 1,
    _productsToLoad: 10,
  }),
  withProps(() => ({
    _apiService: inject(ApiService),
    _notificationService: inject(NotificationService),
    _router: inject(Router),
  })),
  withMethods((store) => ({
    clearList() {
      this.loadProducts();
    },
  })),
  withMethods((store) => ({
    loadProducts() {
      patchState(store, { isLoading: true });
      store._apiService.getProducts(store._pageToLoad(), store._productsToLoad()).subscribe({
        next: (products) => {
          patchState(store, { products: [...store.products(), ...products] });
          patchState(store, { _pageToLoad: store._pageToLoad() + 1 });
        },
        error: (error: HttpErrorResponse) => {
          this._notificationService.notifyError('Failed to load products.');
        },
        complete: () => {
          patchState(store, { isLoading: false });
        },
      });
    },

    deleteProduct: rxMethod<number>(
      pipe(
        switchMap((id) =>
          store._apiService.deleteProduct(id).pipe(
            tapResponse({
              next: () => {
                store.clearList();
                store._notificationService.notifyMessage('Product deleted');
                store._router.navigateByUrl('/products');
              },
              error: ({ error }) =>
                store._notificationService.notifyError('Could not delete product. ' + error),
            })
          )
        )
      )
    ),

    createProduct(newProduct: Product): Observable<Product> {
      return store._apiService.createProduct(newProduct);
    },

    getProduct(id: number): Observable<Product> {
      return store._apiService.getProductById(id);
    },
  })),
  withMethods((store) => ({
    forceRefresh() {
      patchState(store, { products: [] });
      patchState(store, { _pageToLoad: 1 });
      store.loadProducts();
    },
  })),
  withHooks({
    onInit: ({ loadProducts }) => {
      loadProducts();
    },
  })
);
