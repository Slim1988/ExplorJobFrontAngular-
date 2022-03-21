import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    AccordionModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule
} from 'primeng';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { RoutingModule } from '../../routing/routing.module';
import { AuthModule } from '../auth/auth.module';
import { MessagingModule } from './../messaging/messaging.module';
import { UserProfileModalComponent } from './components/modal/user-profile/user-profile-modal.component';
import { UserReportModalComponent } from './components/modal/user-report-modal/user-report-modal.component';
import { UserFavoritesProvider } from './providers/user-favorites.provider';
import { UserMeetingsProvider } from './providers/user-meetings.provider';
import { UserReportingProvider } from './providers/user-reporting.provider';
import { UsersProvider } from './providers/users.provider';
import { UsersService } from './services/users.service';

@NgModule({
    imports: [
        InfrastructureModule,
        AuthModule,
        RoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        DropdownModule,
        MultiSelectModule,
        AccordionModule,
        DialogModule,
        ConfirmDialogModule,
        MessagesModule,
        MessageModule,
        MessagingModule
    ],
    declarations: [
        UserProfileModalComponent,
        UserReportModalComponent
    ],
    exports: [
        UserProfileModalComponent,
        UserReportModalComponent
    ],
    providers: [
        UsersService,
        UsersProvider,
        UserFavoritesProvider,
        UserMeetingsProvider,
        UserReportingProvider
    ]
})
export class UsersModule { }
