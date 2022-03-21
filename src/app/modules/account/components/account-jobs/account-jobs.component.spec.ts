import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogModule, DialogModule, MessageModule, MessagesModule } from 'primeng';
import { JobDomainsProvider } from '../../../jobs/providers/job-domains.provider';
import { JobUsersProvider } from '../../../jobs/providers/job-users.provider';
import { AccountService } from '../../services/account.service';
import { InfrastructureModule } from './../../../../infrastructure/infrastructure.module';
import { AccountJobsComponent } from './account-jobs.component';

describe('AccountJobsComponent', () => {
    let component: AccountJobsComponent;
    let fixture: ComponentFixture<AccountJobsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                ConfirmDialogModule,
                DialogModule,
                FormsModule,
                HttpClientModule,
                InfrastructureModule,
                MessagesModule,
                MessageModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            declarations: [
                AccountJobsComponent
            ],
            providers: [
                AccountService,
                JobUsersProvider,
                JobDomainsProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountJobsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
