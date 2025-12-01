import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DefaultComponent } from './dashboard/default/default.component';
import { HomeComponent } from './home/home.component';
export const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];
