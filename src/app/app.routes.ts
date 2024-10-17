import { Routes } from '@angular/router';
import { HomeComponent } from './pages/portal/home/home.component';
import { UserProfileComponent } from './pages/ucp/user-profile/user-profile.component';
import { UcpLayoutComponent } from './pages/ucp/ucp-layout/ucp-layout.component';
import { StoreComponent } from './pages/ucp/store/store.component';
import { RankingComponent } from './pages/ucp/ranking/ranking.component';
import { PortalComponent } from './pages/portal/portal-layout/portal.component';
import { RankingPageComponent } from './pages/portal/ranking-page/ranking-page.component';

export const routes: Routes = [
    { path: '', component: PortalComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'rank', component: RankingPageComponent },
        ]
     },
    { path: 'ucp', component: UcpLayoutComponent,
    children: [
        { path: 'profile', component: UserProfileComponent },
        { path: 'store', component: StoreComponent },
        { path: 'ranking', component: RankingComponent },
    ]
     },
];
