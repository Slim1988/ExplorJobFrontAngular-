import { NgModule } from '@angular/core';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { RoutingModule } from '../../routing/routing.module';
import { AuthModule } from '../auth/auth.module';
import { CguComponent } from './components/cgu/cgu.component';
import { LegalNoticesComponent } from './components/legal-notices/legal-notices.component';
import { ContractsProvider } from './providers/contracts.provider';

@NgModule({
    imports: [
        InfrastructureModule,
        AuthModule,
        RoutingModule
    ],
    declarations: [
        CguComponent,
        LegalNoticesComponent
    ],
    exports: [],
    providers: [
        ContractsProvider
    ]
})
export class ContractsModule { }
