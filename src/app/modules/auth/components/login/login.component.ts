import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng';
import * as R from 'ramda';
import { environment } from '../../../../../environments/environment';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { RegisterType } from '../../models/register-type.model';
import { AuthProvider } from '../../providers/auth.provider';
import { LoginQuery } from '../../queries/login.query';
import { AuthToken } from './../../models/auth-token.model';
import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css'
    ],
    providers: [
        MessageService
    ]
})
export class LoginComponent extends ParentComponent implements OnInit {
    public loginForm: FormGroup;
    public RegisterType = RegisterType;

    public constructor(
        private readonly authService: AuthService,
        private readonly authProvider: AuthProvider,
        private readonly router: Router,
        private readonly messageService: MessageService
    ) {
        super();
        this.setLoginForm();
    }

    public ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/account');
        }
    }

    public loginIsEnable(): boolean {
        return environment.account.login.enable;
    }

    public async login(): Promise<void> {
        if (this.loginForm.valid) {
            this.loginForm.markAsPristine();
            this.messageService.clear();

            await this.authProvider.login(
                this.mapLoginFormToQuery()
            ).subscribe(
                (response: AuthToken) => {
                    this.authService.SetLogin(
                        response
                    );
                },
                (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        closable: true,
                        detail: 'Email ou mot de passe incorrect'
                    });
                }
            );

        }
    }

    public clearLoginFormEmail(): void {
        this.loginForm.controls.email.setValue(
            R.trim(this.loginForm.value.email)
        );
    }

    private setLoginForm(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required
            ])
        });
    }

    private mapLoginFormToQuery(): LoginQuery {
        return new LoginQuery(
            this.loginForm.value.email,
            this.loginForm.value.password
        );
    }
}
