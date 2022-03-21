import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogModule, DialogModule } from 'primeng';
import { AccountProvider } from '../../providers/account.provider';
import { AccountService } from '../../services/account.service';
import { InfrastructureModule } from './../../../../infrastructure/infrastructure.module';
import { AccountProfileGeneralInformationsComponent } from './account-profile-general-informations.component';

describe('AccountProfileGeneralInformationsComponent', () => {
    let component: AccountProfileGeneralInformationsComponent;
    let fixture: ComponentFixture<AccountProfileGeneralInformationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                ConfirmDialogModule,
                DialogModule,
                HttpClientModule,
                InfrastructureModule,
                RouterTestingModule
            ],
            declarations: [
                AccountProfileGeneralInformationsComponent
            ],
            providers: [
                AccountService,
                AccountProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountProfileGeneralInformationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
