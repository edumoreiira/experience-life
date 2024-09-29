import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/ucp/user-profile/user-profile.component';
import { UcpLayoutComponent } from './pages/ucp/ucp-layout/ucp-layout.component';
import { StoreComponent } from './pages/ucp/store/store.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'ucp', component: UcpLayoutComponent,
    children: [
        { path: 'profile', component: UserProfileComponent },
        { path: 'store', component: StoreComponent },
    ]
     },
];
