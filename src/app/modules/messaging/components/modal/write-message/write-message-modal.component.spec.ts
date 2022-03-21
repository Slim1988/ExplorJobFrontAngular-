import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogModule } from 'primeng';
import { AccountService } from '../../../../account/services/account.service';
import { MessagingProvider } from '../../../providers/messaging.provider';
import { WriteMessageModalComponent } from './write-message-modal.component';

describe('WriteMessageModalComponent', () => {
    let component: WriteMessageModalComponent;
    let fixture: ComponentFixture<WriteMessageModalComponent>;

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
                WriteMessageModalComponent
            ],
            providers: [
                AccountService,
                MessagingProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WriteMessageModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
