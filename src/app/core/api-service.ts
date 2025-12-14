import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { delay, map, Observable } from 'rxjs';
import { config } from '../../environments/environment';
import { Auth } from '../models/auth';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly productsBaseUrl = config.productsApiUrl;
  private readonly authBaseUrl = config.authApiUrl;
  private readonly adminBaseUrl: string = config.adminApiUrl;

  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  getProducts(pageToLoad: number = 1, productsToLoad: number = 10, sortBy: string = 'modifiedDate', order: string = 'desc'): Observable<Product[]> {
    const params = {
      page: pageToLoad,
      limit: productsToLoad,
      sortBy: sortBy,
      order: order,
    };

    const options = {
      params: params,
    };

    return this.http.get<Product[]>(this.productsBaseUrl, options).pipe(delay(1000)); // Simulating network delay
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.productsBaseUrl + id);
  }

  createProduct(product: Omit<Product, 'id'>) {
    return this.http.post<Product>(this.productsBaseUrl, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<void>(this.productsBaseUrl + id);
  }

  getUserProfile(): Observable<any> {
    const authToken = this.storageService.getToken();
    const headers = { Authorization: `Bearer ${authToken}` };

    return this.http
      .get<any>(this.adminBaseUrl, { headers })
      .pipe(map((response) => response.profile));
  }

  login(username: string, password: string) {
    let body = {
      email: username,
      password: password,
    };

    return this.http.post<Auth>(this.authBaseUrl, body);
  }
}
