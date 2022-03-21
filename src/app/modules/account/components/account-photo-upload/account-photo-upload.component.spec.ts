import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountProvider } from '../../providers/account.provider';
import { AccountService } from '../../services/account.service';
import { AccountPhotoUploadComponent } from './account-photo-upload.component';

describe('AccountPhotoUploadComponent', () => {
    let component: AccountPhotoUploadComponent;
    let fixture: ComponentFixture<AccountPhotoUploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                AccountPhotoUploadComponent
            ],
            providers: [
                AccountService,
                AccountProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountPhotoUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
