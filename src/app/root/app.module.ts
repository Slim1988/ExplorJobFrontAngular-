import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AccountModule } from '../modules/account/account.module';
import { AuthModule } from '../modules/auth/auth.module';
import { CompaniesModule } from '../modules/companies/companies.module';
import { MessagingModule } from '../modules/messaging/messaging.module';
import { UsersModule } from '../modules/users/users.module';
import { RoutingModule } from '../routing/routing.module';
import { HelpModule } from './../modules/help/help.module';
import { JobsModule } from './../modules/jobs/jobs.module';
import { SearchModule } from './../modules/search/search.module';
import { AppCondensedMenuComponent } from './app-condensed-menu/app-condensed-menu.component';
import { AppTopbarComponent } from './app-topbar/app-topbar.component';
import { AppComponent } from './app.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        InfrastructureModule,
        RoutingModule,
        HelpModule,
        AuthModule,
        AccountModule,
        UsersModule,
        MessagingModule,
        JobsModule,
        SearchModule,
        CompaniesModule,
        NoopAnimationsModule,
        NgxLinkifyjsModule.forRoot(),
        MatMenuModule,
    ],
    declarations: [
        AppComponent,
        AppTopbarComponent,
        AppCondensedMenuComponent,
    ],
    exports: [
        AppComponent,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
