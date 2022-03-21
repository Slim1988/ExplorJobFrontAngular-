import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageModule, MessagesModule } from 'primeng';
import { AuthProvider } from '../../providers/auth.provider';
import { AuthService } from '../../services/auth.service';
import { InfrastructureModule } from './../../../../infrastructure/infrastructure.module';
import { ConfirmEmailComponent } from './confirm-email.component';

describe('ConfirmEmailComponent', () => {
    let component: ConfirmEmailComponent;
    let fixture: ComponentFixture<ConfirmEmailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                HttpClientModule,
                InfrastructureModule,
                MessagesModule,
                MessageModule,
                RouterTestingModule
            ],
            declarations: [
                ConfirmEmailComponent
            ],
            providers: [
                AuthService,
                AuthProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
