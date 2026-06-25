import { ActivatedRoute, Router } from '@angular/router';
import { Component, AfterViewInit, ElementRef, inject, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormsModule } from "@angular/forms";
import { AuthService } from '../core/auth-service';

@Component({
    template: `
        <h2>Login</h2>
        <form #loginForm="ngForm" (ngSubmit)="loginUser(loginForm)" style="margin-bottom: 80px">
        <label for="username">Username</label>
        <input type="text" name="username" #username id="username" required ngModel autocomplete="off">
        <br /><br />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required ngModel autocomplete="off">
        <br /><br />
        <button type="submit" [disabled]="loginForm.invalid">Login</button>
        <br />
        <span class="errorMessage">{{error}}</span>
        </form>
    `,
    styles: `
        label {
            width: 100px;
            display:inline-block;
        }

        button {
            margin-left: 100px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule]
})
export class Login implements AfterViewInit {
    error = '';

    private authService = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    loginUser(form: NgForm) {
        if (form.valid) {
            this.authService
                .login(form.value.username, form.value.password)
                .subscribe(
                    result => {
                        if (result) {
                            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
                            this.router.navigateByUrl(returnUrl);
                        } else {
                            this.error = 'Invalid username or password!';
                        }
                    }
                );
        }
    }

    // Grab the #username element from the template
    usernameInput = viewChild<ElementRef<HTMLInputElement>>('username');

    ngAfterViewInit(): void {
        this.setFocus();
    }

    setFocus() {
        // Focus the element once the view is ready
        this.usernameInput()?.nativeElement.focus();
    }
}