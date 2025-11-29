import { Component, computed, inject, signal } from '@angular/core';
import {
  form,
  required,
  minLength,
  Field,
  maxLength,
  pattern,
  min,
  max,
  schema,
  submit,
  debounce,
} from '@angular/forms/signals';
import { Product } from '../../models/product';
import { ProductService } from '../product-service';
import { Router } from '@angular/router';
import { NetworkStatusService } from '../../core/network-status-service';
import { AuthService } from '../../core/auth-service';

@Component({
  selector: 'app-product-form',
  imports: [Field],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private productService = inject(ProductService);
  private router = inject(Router);
  private networkService = inject(NetworkStatusService);
  private authService = inject(AuthService);

  private readonly isOnline = this.networkService.isOnline;
  private readonly isLoggedin = this.authService.isLoggedIn;

  protected readonly product = signal({
    name: '',
    description: '',
    discontinued: false,
    fixedPrice: false,
    price: 0,
    modifiedDate: new Date(),
    imageUrl: '',
  });

  protected readonly productSchema = schema<Omit<Product, 'id'>>((path) => {
    debounce(path.name, 500);
    required(path.name, { message: 'Name is required.'});
    minLength(path.name, 3, { message: 'Name must be at least 3 characters long.'});
    maxLength(path.name, 50, { message: 'Name cannot exceed 50 characters.'});

    required(path.price, { message: 'Price is required.'});
    min(path.price, 0, { message: 'Price cannot be negative.'});
    max(path.price, 100000, { message: 'Price cannot exceed 100 000.'});

    debounce(path.description, 500);
    minLength(path.description, 5, { message: 'Description must be at least 5 characters long.'});
    maxLength(path.description, 500, { message: 'Description cannot exceed 500 characters.'});

    pattern(
      path.imageUrl,
      new RegExp(
        '^(https?://[a-zA-Z0-9-.]+.[a-zA-Z]{2,5}(?:/S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+.)(\\?(?:&?[^=&]*=[^=&]*)*)?$'
      ),
      {
        message: 'Invalid image url.',
      }
    );
  });

  protected readonly productForm = form(this.product, this.productSchema);
  protected readonly disableSubmit = computed(() => !this.isOnline() || !this.isLoggedin() || this.productForm().invalid() || this.productForm().submitting())

  protected submitForm(event: SubmitEvent) {
    event.preventDefault(); // Prevent page reload (default browser behavior)

    submit(this.productForm, async (form) => {
      const newProduct = form().value();
      console.log('Product to save:', newProduct);
      await this.productService.createProduct(newProduct);
      this.router.navigateByUrl('/products');
    });
  }
}
