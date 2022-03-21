import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { APP_ROUTES } from '../config/app-routes';
import { AuthGuard } from '../modules/auth/guards/auth.guard';
import { InfrastructureModule } from './../infrastructure/infrastructure.module';
import { RedirectorComponent } from './components/root/redirector.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            APP_ROUTES,
            { enableTracing: !environment.production && environment.debug }
        ),
        InfrastructureModule
    ],
    declarations: [
        RedirectorComponent
    ],
    exports: [
        RouterModule,
        RedirectorComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class RoutingModule { }
