import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule, DialogModule, MessageModule, MessagesModule, MultiSelectModule } from 'primeng';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { MessagingModule } from '../messaging/messaging.module';
import { UsersModule } from '../users/users.module';
import { SearchModule } from './../search/search.module';
import { CompanyImageModalComponent } from './components/company-image-modal/company-image-modal.component';
import { CompanyComponent } from './components/company/company.component';
import { CompaniesProvider } from './providers/companies.provider';

@NgModule({
    imports: [
        DialogModule,
        InfrastructureModule,
        CommonModule,
        DialogModule,
        ConfirmDialogModule,
        BrowserModule,
        BrowserAnimationsModule,
        MessagesModule,
        MessageModule,
        MessagingModule,
        UsersModule,
        MultiSelectModule,
        SearchModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        CompanyComponent,
        CompanyImageModalComponent
    ],
    exports: [
        CompanyComponent,
        CompanyImageModalComponent
    ],
    providers: [
        CompaniesProvider
    ]
})
export class CompaniesModule { }
