import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'companies',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/companies/companies-list/companies-list').then(
        (m) => m.CompaniesList,
      ),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
