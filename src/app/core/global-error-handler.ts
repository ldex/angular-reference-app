import { EnvironmentProviders, ErrorHandler, Injectable, makeEnvironmentProviders } from "@angular/core";
import { ErrorService } from "./error-service";
import { DialogService } from "./dialog-service";

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private dialogService: DialogService,
    private errorService: ErrorService
  ) {}

  handleError(error: Error) {
    // Handle Client Error (Angular Error, ReferenceError...)
    this.errorService.log(error);
    this.dialogService.alert(error?.message || "Undefined client error");
    console.error("Error from global error handler", error);
  }
}

export function provideAppErrorHandler(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ]);
}
