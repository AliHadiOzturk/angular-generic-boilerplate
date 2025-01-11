import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadComponent: () => 
      import('./features/users/user-list.component').then(m => m.UserListComponent),
    title: 'Users'
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];
