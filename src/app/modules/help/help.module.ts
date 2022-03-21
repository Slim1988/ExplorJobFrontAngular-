import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { RoutingModule } from '../../routing/routing.module';
import { HelpComponent } from './components/help/help.component';

@NgModule({
    imports: [
        InfrastructureModule,
        RoutingModule,
        DialogModule
    ],
    declarations: [
        HelpComponent
    ],
    exports: [
        HelpComponent
    ],
    providers: []
})
export class HelpModule { }
