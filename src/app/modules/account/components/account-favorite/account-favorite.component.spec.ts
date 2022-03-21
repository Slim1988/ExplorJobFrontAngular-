import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountFavoriteComponent } from './account-favorite.component';

describe('AccountFavoriteComponent', () => {
    let component: AccountFavoriteComponent;
    let fixture: ComponentFixture<AccountFavoriteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                AccountFavoriteComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountFavoriteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
