import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountModule } from './../../account.module';
import { AccountLayoutContentComponent } from './account-layout-content.component';

describe('AccountLayoutContentComponent', () => {
    let component: AccountLayoutContentComponent;
    let fixture: ComponentFixture<AccountLayoutContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AccountModule,
                BrowserDynamicTestingModule,
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                AccountLayoutContentComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountLayoutContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
