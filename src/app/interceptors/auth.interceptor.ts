import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../core/auth-service";
import { StorageService } from "../core/storage-service";

// Note: This Interceptor is for reference only
// It is not needed anymore because it is now taken care of by the @auth0/angular-jwt library
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService)

  // Get auth token (from local storage)
  const authToken: string = storageService.getToken();
  if (authService.isLoggedIn() && authToken) {
    // inject the auth token to the Http Headers
    const reqWithAuth = request.clone({
      setHeaders: { Authorization: "Bearer " + authToken },
    });
    return next(reqWithAuth);
  } else {
    return next(request);
  }
};
