import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextareaModule,
    MessageModule,
    MessagesModule
} from 'primeng';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { RoutingModule } from '../../routing/routing.module';
import { AuthModule } from '../auth/auth.module';
import { PromotionsModule } from './../promotions/promotions.module';
import { MessageSentConfirmationComponent } from './components/modal/message-sent-confirmation/message-sent-confirmation.component';
import { ReviewModalComponent } from './components/modal/review-modal/review-modal.component';
import { ShowProposalsModalComponent } from './components/modal/show-proposals/show-proposals-modal.component';
import { WriteMessageModalComponent } from './components/modal/write-message/write-message-modal.component';
import { ProposalCalendarComponent } from './components/proposal-calendar/proposal-calendar.component';
import { MessagingProvider } from './providers/messaging.provider';
import { ClickStopPropagationDirective } from './stop-propagation/stop-propagation.directive';

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
        InputTextareaModule,
        DialogModule,
        ConfirmDialogModule,
        MessagesModule,
        MessageModule,
        MatListModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatDatepickerModule,
        NgxMatNativeDateModule,
        NgxMatMomentModule,
        MatInputModule,
        MatGridListModule,
        MatToolbarModule,
        MatCardModule,
        NgbModule,
        MatRadioModule,
        PromotionsModule
    ],
    declarations: [
        WriteMessageModalComponent,
        ShowProposalsModalComponent,
        ProposalCalendarComponent,
        MessageSentConfirmationComponent,
        ClickStopPropagationDirective,
        ReviewModalComponent
    ],
    exports: [
        WriteMessageModalComponent,
        ShowProposalsModalComponent,
        ReviewModalComponent,
        ProposalCalendarComponent,
        MessageSentConfirmationComponent,
        MatFormFieldModule,
        MatInputModule,
        ClickStopPropagationDirective,
    ],
    providers: [
        MessagingProvider,
        { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }

    ]
})
export class MessagingModule { }
