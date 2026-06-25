import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-error',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
        <h2 class="errorMessage">App Error!</h2>
        <p style="margin-bottom: 80px">An error occurred.</p>
    `,
})
export class AppError {


}