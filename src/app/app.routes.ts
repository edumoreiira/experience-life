import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/ucp/user-profile/user-profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'ucp', component: UserProfileComponent },
];
