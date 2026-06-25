import {
  EnvironmentProviders,
  ErrorHandler,
  inject,
  Service,
  makeEnvironmentProviders
} from '@angular/core';
import { ErrorService } from './error-service';
import { NotificationService } from './notification-service';

@Service()
export class GlobalErrorHandler implements ErrorHandler {
  private notificationService = inject(NotificationService);
  private errorService = inject(ErrorService);

  handleError(error: Error) {
    // Handle Client Error (Angular Error, ReferenceError...)
    this.errorService.log(error);
    this.notificationService.notifyError(error?.message || 'Undefined client error')
    console.error('Error from global error handler', error);
  }
}

export function provideAppErrorHandler(): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: ErrorHandler, useClass: GlobalErrorHandler }]);
}
