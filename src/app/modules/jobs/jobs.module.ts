import { NgModule } from '@angular/core';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { RoutingModule } from '../../routing/routing.module';
import { AuthModule } from '../auth/auth.module';
import { JobDomainsProvider } from './providers/job-domains.provider';
import { JobUsersProvider } from './providers/job-users.provider';

@NgModule({
    imports: [
        InfrastructureModule,
        AuthModule,
        RoutingModule
    ],
    declarations: [],
    exports: [],
    providers: [
        JobDomainsProvider,
        JobUsersProvider
    ]
})
export class JobsModule { }
