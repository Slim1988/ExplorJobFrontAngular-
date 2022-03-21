import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { CommonModule, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    ConfirmationService,
    ConfirmDialogModule,
    DialogModule,
    DragDropModule,
    DropdownModule,
    FileUploadModule,
    InputMaskModule,
    InputTextareaModule,
    InputTextModule,
    MessageModule,
    MessageService,
    MessagesModule,
    MultiSelectModule,
    PaginatorModule,
    PasswordModule,
    RadioButtonModule,
    ToastModule
} from 'primeng';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { RoutingModule } from '../../routing/routing.module';
import { AuthModule } from '../auth/auth.module';
import { MessagingModule } from '../messaging/messaging.module';
import { JobsModule } from './../jobs/jobs.module';
import { UsersModule } from './../users/users.module';
import { AccountAppointmentsComponent } from './components/account-appointments/account-appointments.component';
import { AccountBecomeProfessionalComponent } from './components/account-become-professional/account-become-professional.component';
import { AccountChangePasswordComponent } from './components/account-change-password/account-change-password.component';
import { AccountConversationComponent } from './components/account-conversation/account-conversation.component';
import { AccountFavoriteComponent } from './components/account-favorite/account-favorite.component';
import { AccountFavoritesComponent } from './components/account-favorites/account-favorites.component';
import { AccountJobComponent } from './components/account-job/account-job.component';
import { AccountJobsComponent } from './components/account-jobs/account-jobs.component';
import { AccountLayoutContentComponent } from './components/account-layout-content/account-layout-content.component';
import { AccountLayoutSidebarComponent } from './components/account-layout-sidebar/account-layout-sidebar.component';
import { AccountMessageComponent } from './components/account-message/account-message.component';
import { AccountMessagingComponent } from './components/account-messaging/account-messaging.component';
import { AccountPhotoUploadComponent } from './components/account-photo-upload/account-photo-upload.component';
import { AccountProfileContactInformationsComponent } from './components/account-profile-contact-informations/account-profile-contact-informations.component';
import { AccountProfileGeneralInformationsComponent } from './components/account-profile-general-informations/account-profile-general-informations.component';
import { AccountProfileSituationInformationsComponent } from './components/account-profile-situation-informations/account-profile-situation-informations.component';
import { AccountComponent } from './components/account/account.component';
import { AccountProvider } from './providers/account.provider';
import { AccountService } from './services/account.service';

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
        InputTextareaModule,
        InputMaskModule,
        PasswordModule,
        CheckboxModule,
        RadioButtonModule,
        DropdownModule,
        MultiSelectModule,
        CalendarModule,
        FileUploadModule,
        PaginatorModule,
        DragDropModule,
        DialogModule,
        ConfirmDialogModule,
        ToastModule,
        MessagesModule,
        MessageModule,
        MessagingModule,
        UsersModule,
        JobsModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        NgxMatNativeDateModule,
        MatExpansionModule,
        CommonModule,
        MatTableModule,
        MatSnackBarModule
    ],
    declarations: [
        AccountComponent,
        AccountLayoutSidebarComponent,
        AccountLayoutContentComponent,
        AccountPhotoUploadComponent,
        AccountProfileGeneralInformationsComponent,
        AccountProfileContactInformationsComponent,
        AccountProfileSituationInformationsComponent,
        AccountMessagingComponent,
        AccountConversationComponent,
        AccountMessageComponent,
        AccountFavoritesComponent,
        AccountFavoriteComponent,
        AccountJobsComponent,
        AccountJobComponent,
        AccountChangePasswordComponent,
        AccountBecomeProfessionalComponent,
        AccountAppointmentsComponent
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        AccountService,
        AccountProvider,
        MessageService,
        ConfirmationService,
        MatDatepickerModule,
        TitleCasePipe,
        UpperCasePipe
    ]
})
export class AccountModule { }
