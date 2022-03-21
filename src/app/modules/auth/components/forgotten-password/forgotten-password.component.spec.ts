import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InputTextModule, MessageModule, MessagesModule } from 'primeng';
import { AuthProvider } from '../../providers/auth.provider';
import { AuthService } from '../../services/auth.service';
import { ForgottenPasswordComponent } from './forgotten-password.component';

describe('ForgottenPasswordComponent', () => {
    let component: ForgottenPasswordComponent;
    let fixture: ComponentFixture<ForgottenPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                FormsModule,
                HttpClientModule,
                InputTextModule,
                MessagesModule,
                MessageModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            declarations: [
                ForgottenPasswordComponent
            ],
            providers: [
                AuthService,
                AuthProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgottenPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
