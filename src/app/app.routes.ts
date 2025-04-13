import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'survey-list', pathMatch: 'full' },
  { path: 'survey-list', component: SurveyListComponent, canActivate: [authGuard] },
  { path: 'new-survey', component: SurveyFormComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'survey/:id',
    loadComponent: () =>
      import('./components/survey-detail/survey-detail.component').then(m => m.SurveyDetailComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'survey-list' }
];
