import { Routes } from '@angular/router';
import { AccountComponent } from '../modules/account/components/account/account.component';
import { ConfirmEmailComponent } from '../modules/auth/components/confirm-email/confirm-email.component';
import { LoginComponent } from '../modules/auth/components/login/login.component';
import { RegisterComponent } from '../modules/auth/components/register/register.component';
import { ResetPasswordComponent } from '../modules/auth/components/reset-password/reset-password.component';
import { AuthGuard } from '../modules/auth/guards/auth.guard';
import { SearchRequestComponent } from '../modules/search/components/search-request/search-request.component';
import { SearchResultsComponent } from '../modules/search/components/search-results/search-results.component';
import { RedirectorComponent } from '../routing/components/root/redirector.component';
import { ForgottenPasswordComponent } from './../modules/auth/components/forgotten-password/forgotten-password.component';
import { LogoutComponent } from './../modules/auth/components/logout/logout.component';
import { CompanyComponent } from './../modules/companies/components/company/company.component';
import { CguComponent } from './../modules/contracts/components/cgu/cgu.component';
import { LegalNoticesComponent } from './../modules/contracts/components/legal-notices/legal-notices.component';
import { REDIRECTIONS } from './redirections';

export const APP_ROUTES: Routes = [
    {
        path: REDIRECTIONS.home.path,
        component: RedirectorComponent
    },
    {
        path: 'search',
        children: [
            {
                path: 'request',
                component: SearchRequestComponent
            },
            {
                path: 'request/:localisation',
                component: SearchRequestComponent
            },
            {
                path: 'results',
                component: SearchResultsComponent
            },
            {
                path: '',
                redirectTo: 'request',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: REDIRECTIONS.news.path,
        component: RedirectorComponent
    },
    {
        path: REDIRECTIONS.professional.path,
        component: RedirectorComponent
    },
    {
        path: REDIRECTIONS.company.path,
        component: RedirectorComponent
    },
    {
        path: REDIRECTIONS.companion.path,
        component: RedirectorComponent
    },
    {
        path: REDIRECTIONS.whoarewe.path,
        component: RedirectorComponent
    },
    {
        path: REDIRECTIONS.joinus.path,
        component: RedirectorComponent
    },
    {
        path: REDIRECTIONS.team.path,
        component: RedirectorComponent
    },
    {
        path: REDIRECTIONS.theysupportus.path,
        component: RedirectorComponent
    },
    {
        path: REDIRECTIONS.ourstory.path,
        component: RedirectorComponent
    },

    {
        path: 'register/:type',
        component: RegisterComponent
    },
    {
        path: 'confirm-email/:email/:token',
        component: ConfirmEmailComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'account/:menu',
        component: AccountComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'forgotten-password',
        component: ForgottenPasswordComponent
    },
    {
        path: 'reset-password/:email/:token',
        component: ResetPasswordComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'cgu',
        component: CguComponent
    },
    {
        path: 'legal-notices',
        component: LegalNoticesComponent
    },
    {
        path: 'company/:slug',
        component: CompanyComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
