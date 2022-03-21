import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { ResetPasswordCommand } from '../../commands/reset-password.command';
import { AuthProvider } from '../../providers/auth.provider';
import { AuthService } from '../../services/auth.service';
import { ConfirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: [
        './reset-password.component.css'
    ],
    providers: [
        MessageService
    ]
})
export class ResetPasswordComponent extends ParentComponent implements OnInit {
    public resetPasswordForm: FormGroup;

    private email: string;
    private token: string;

    public constructor(
        private readonly authService: AuthService,
        private readonly authProvider: AuthProvider,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly messageService: MessageService
    ) {
        super();
        this.setResetPasswordForm();
    }

    public ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/account');
        }

        this.email = this.route.snapshot.paramMap.get('email');
        this.token = this.route.snapshot.paramMap.get('token');
    }

    public async resetPassword(): Promise<void> {
        if (this.resetPasswordForm.valid) {
            this.messageService.clear();

            await this.authProvider.resetPassword(
                this.mapResetPasswordFormToCommand()
            ).subscribe(
                (response: any) => {
                    this.messageService.add({
                        severity: 'success',
                        closable: true,
                        detail: `Votre nouveau mot de passe a bien été enregistré`
                    });

                    setTimeout(() => {
                        this.router.navigateByUrl('/login');
                    }, 5000);
                },
                (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        closable: true,
                        detail: `Le mot de passe n'a pas pu être enregistré`
                    });
                }
            );
        }
    }

    private setResetPasswordForm(): void {
        this.resetPasswordForm = new FormGroup({
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(
                    CONFIG.restrictions.passwords.minLength
                )
            ]),
            confirmPassword: new FormControl('', [
                Validators.required
            ])
        });

        this.resetPasswordForm.setValidators(Validators.compose([
            ConfirmPasswordValidator()
        ]));
    }

    private mapResetPasswordFormToCommand(): ResetPasswordCommand {
        return new ResetPasswordCommand(
            this.email,
            this.token,
            this.resetPasswordForm.value.password
        );
    }
}
