import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckboxModule, InputTextModule, MessageModule, MessagesModule, PasswordModule } from 'primeng';
import { CalendarModule } from 'primeng';
import { AuthProvider } from '../../providers/auth.provider';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserDynamicTestingModule,
                CheckboxModule,
                FormsModule,
                HttpClientModule,
                InputTextModule,
                MessagesModule,
                MessageModule,
                PasswordModule,
                ReactiveFormsModule,
                CalendarModule,
                RouterTestingModule
            ],
            declarations: [
                RegisterComponent
            ],
            providers: [
                AuthService,
                AuthProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
