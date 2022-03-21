import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    AutoCompleteModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule
} from 'primeng';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { RoutingModule } from '../../routing/routing.module';
import { AuthModule } from '../auth/auth.module';
import { MessagingModule } from '../messaging/messaging.module';
import { PromotionsModule } from '../promotions/promotions.module';
import { UsersModule } from '../users/users.module';
import { SearchRequestComponent } from './components/search-request/search-request.component';
import { SearchResultPublicComponent } from './components/search-result-public/search-result-public.component';
import { SearchResultRestrictedComponent } from './components/search-result-restricted/search-result-restricted.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchProvider } from './providers/search.provider';
import { SearchService } from './services/search.service';

@NgModule({
    imports: [
        AutoCompleteModule,
        InfrastructureModule,
        RoutingModule,
        AuthModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        MultiSelectModule,
        DialogModule,
        ConfirmDialogModule,
        MessagesModule,
        MessageModule,
        MessagingModule,
        UsersModule,
        PromotionsModule
    ],
    declarations: [
        SearchRequestComponent,
        SearchResultsComponent,
        SearchResultPublicComponent,
        SearchResultRestrictedComponent
    ],
    exports: [
        SearchResultsComponent,
        SearchResultPublicComponent,
        SearchResultRestrictedComponent
    ],
    providers: [
        SearchService,
        SearchProvider,
    ]
})
export class SearchModule { }
