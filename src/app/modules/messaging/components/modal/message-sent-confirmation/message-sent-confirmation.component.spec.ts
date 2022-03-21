import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogModule } from 'primeng';
import { AccountService } from '../../../../account/services/account.service';
import { MessagingProvider } from '../../../providers/messaging.provider';
import { MessageSentConfirmationComponent } from './message-sent-confirmation.component';

describe('MessageSentConfirmationComponent', () => {
    let component: MessageSentConfirmationComponent;
    let fixture: ComponentFixture<MessageSentConfirmationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                DialogModule,
                FormsModule,
                HttpClientModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            declarations: [
                MessageSentConfirmationComponent
            ],
            providers: [
                AccountService,
                MessagingProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageSentConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
