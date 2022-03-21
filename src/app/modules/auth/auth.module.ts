import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    PasswordModule
} from 'primeng';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { RoutingModule } from './../../routing/routing.module';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForbiddenInterceptor } from './interceptors/forbidden.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { AuthProvider } from './providers/auth.provider';
import { AuthService } from './services/auth.service';

@NgModule({
    imports: [
        InfrastructureModule,
        RoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        InputMaskModule,
        PasswordModule,
        CheckboxModule,
        DropdownModule,
        CalendarModule,
        DialogModule,
        ConfirmDialogModule,
        MessagesModule,
        MessageModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule
    ],
    declarations: [
        RegisterComponent,
        ConfirmEmailComponent,
        LoginComponent,
        ForgottenPasswordComponent,
        ResetPasswordComponent,
        LogoutComponent
    ],
    exports: [],
    providers: [
        AuthService,
        AuthProvider,
        MatDatepickerModule,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorizedInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ForbiddenInterceptor,
            multi: true
        }
    ]
})
export class AuthModule { }
