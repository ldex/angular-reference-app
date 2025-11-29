import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { config } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly platform = inject(PLATFORM_ID);
  private readonly storageTokenKey: string = config.storageTokenKey;

  storeToken(token) {
    // Store the token locally  in Local Storage (HTML5)
    // Check in Chrome Dev Tools / Application / Local Storage
    localStorage.setItem(this.storageTokenKey, token);
  }

  getToken(): string {
    if (isPlatformBrowser(this.platform)) { // Runs only client side (SSR is enabled on this app)
      return localStorage.getItem(this.storageTokenKey);
    } else {
      return null;
    }
  }

   removeTokens() {
    localStorage.removeItem(this.storageTokenKey);
  }
}
