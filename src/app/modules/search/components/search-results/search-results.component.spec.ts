import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogModule, MessageModule, MessagesModule } from 'primeng';
import { AccountService } from '../../../account/services/account.service';
import { AuthService } from '../../../auth/services/auth.service';
import { MessagingModule } from '../../../messaging/messaging.module';
import { UserFavoritesProvider } from '../../../users/providers/user-favorites.provider';
import { UsersModule } from '../../../users/users.module';
import { SearchProvider } from '../../providers/search.provider';
import { SearchService } from '../../services/search.service';
import { InfrastructureModule } from './../../../../infrastructure/infrastructure.module';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                ConfirmDialogModule,
                HttpClientModule,
                InfrastructureModule,
                MessageModule,
                MessagesModule,
                MessagingModule,
                RouterTestingModule,
                UsersModule
            ],
            declarations: [
                SearchResultsComponent
            ],
            providers: [
                AuthService,
                AccountService,
                SearchService,
                SearchProvider,
                UserFavoritesProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
