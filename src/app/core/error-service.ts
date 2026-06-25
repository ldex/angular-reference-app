import { inject, Service } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { Observable, of } from 'rxjs';
import { serializeError } from 'serialize-error';

@Service()
export class ErrorService {

  private locationStrategy = inject(LocationStrategy)

  log(error) {
    // Get error details
    const errorToSend = this.addContextInfo(error || {});
    // Send those details to a server
    HttpService.LogToServer(errorToSend);
  }

  private addContextInfo(error) {
    const appId = 'Reference App';
    const user = 'Angular Academy'; // Get it from a UserService if you have any...
    const time = new Date().getTime();
    const url = this.locationStrategy.path();
    // Librairie serialize-error pour sérialiser l'erreur et avoir un objet plat (status, message, name, etc.)
    const serialized = serializeError(error);
    const errorWithContext = {appId, user, time, url, serialized};
    return errorWithContext;
  }
}


class HttpService {
    // Pretend that we send an error to a server...
  static LogToServer(error): Observable<any> {
    console.log('Error sent to the server: ', error);
    return of(error);
  }
}