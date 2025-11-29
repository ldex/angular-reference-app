import { Routes } from '@angular/router';
import { Home } from './shared/home';
import { AppError } from './shared/app-error';
import { Admin } from './shared/admin';
import { Login } from './shared/login';
import { NavError } from './shared/nav-error';
import { ComposeMessage } from './shared/compose-message';
import { loginRouteGuard } from './login-route.guard';
import { ErrorDemo } from './shared/error-demo';
import { WorkerDemo } from './shared/worker-demo';
import { Contact } from './shared/contact';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home, title: 'Home' },
    { path: 'errors', component: ErrorDemo, title: 'Errors demo' },
    { path: 'worker', component: WorkerDemo, title: 'Worker demo' },
    { path: 'contact', component: Contact, title: 'Contact' },
    { path: 'message', component: ComposeMessage, outlet: 'side' },
    { path: 'admin', component: Admin, title: 'Admin', canActivate: [loginRouteGuard] },
    { path: 'login', component: Login, title: 'Login' },
    { path: 'products', loadChildren: () => import('./products/products.routes').then(m => m.productsRoutes) },
    { path: 'error', component: AppError, title: 'Error' },
    { path: '**', component: NavError, title: 'Not Found' },
];
