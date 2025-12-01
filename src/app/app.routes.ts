import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'application',
    loadChildren: () =>
      import('./admin/admin.routes').then(m => m.AdminRoutes)   // ✅ Lazy loading
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
