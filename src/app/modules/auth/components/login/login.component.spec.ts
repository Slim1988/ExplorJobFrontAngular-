import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InputTextModule, MessageModule, MessagesModule, PasswordModule } from 'primeng';
import { AuthService } from '../../services/auth.service';
import { RoutingModule } from './../../../../routing/routing.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                FormsModule,
                HttpClientModule,
                InputTextModule,
                MessagesModule,
                MessageModule,
                PasswordModule,
                RouterTestingModule,
                ReactiveFormsModule,
                RoutingModule
            ],
            declarations: [
                LoginComponent
            ],
            providers: [
                AuthService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
