import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '',           component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent },

  { path: 'login', redirectTo: '', pathMatch: 'full' },
  { path: '**',    redirectTo: '', pathMatch: 'full' }
  // { path: '**',     redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
