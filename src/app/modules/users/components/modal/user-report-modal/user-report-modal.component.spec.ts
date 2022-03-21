import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogModule, DropdownModule, MessageModule, MessagesModule } from 'primeng';
import { AccountService } from '../../../../account/services/account.service';
import { UserReportingProvider } from '../../../providers/user-reporting.provider';
import { UserReportModalComponent } from './user-report-modal.component';

describe('UserReportModalComponent', () => {
    let component: UserReportModalComponent;
    let fixture: ComponentFixture<UserReportModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                DialogModule,
                DropdownModule,
                FormsModule,
                HttpClientModule,
                MessagesModule,
                MessageModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            declarations: [
                UserReportModalComponent
            ],
            providers: [
                AccountService,
                UserReportingProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserReportModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
