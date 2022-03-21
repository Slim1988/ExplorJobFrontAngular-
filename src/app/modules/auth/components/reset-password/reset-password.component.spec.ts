import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogModule, MessageModule, MessagesModule, PasswordModule } from 'primeng';
import { AuthProvider } from '../../providers/auth.provider';
import { AuthService } from '../../services/auth.service';
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                DialogModule,
                FormsModule,
                HttpClientModule,
                MessagesModule,
                MessageModule,
                PasswordModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            declarations: [
                ResetPasswordComponent
            ],
            providers: [
                AuthService,
                AuthProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
