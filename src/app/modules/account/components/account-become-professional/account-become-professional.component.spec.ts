import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountProvider } from '../../providers/account.provider';
import { AccountService } from '../../services/account.service';
import { AccountBecomeProfessionalComponent } from './account-become-professional.component';

describe('AccountBecomeProfessionalComponent', () => {
    let component: AccountBecomeProfessionalComponent;
    let fixture: ComponentFixture<AccountBecomeProfessionalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                AccountBecomeProfessionalComponent
            ],
            providers: [
                AccountService,
                AccountProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountBecomeProfessionalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
