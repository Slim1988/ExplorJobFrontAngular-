import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { ChangePasswordCommand } from '../../../auth/commands/change-password.command';
import { AuthProvider } from '../../../auth/providers/auth.provider';
import { ConfirmPasswordValidator } from '../../../auth/validators/confirm-password.validator';
import { AccountService } from './../../services/account.service';

@Component({
    selector: 'account-change-password',
    templateUrl: './account-change-password.component.html',
    styleUrls: [
        './account-change-password.component.css'
    ],
    providers: [
        MessageService
    ]
})
export class AccountChangePasswordComponent extends ParentComponent implements OnInit {
    public changePasswordForm: FormGroup;

    public constructor(
        private readonly accountService: AccountService,
        private readonly authProvider: AuthProvider,
        private readonly messageService: MessageService,
        private readonly router: Router
    ) {
        super();
        this.setChangePasswordForm();
    }

    public ngOnInit(): void { }

    public changePassword(): void {
        if (this.changePasswordForm.valid) {
            this.messageService.clear();
            this.authProvider.changePassword(
                this.mapChangePasswordFormToCommand()
            ).subscribe(
                (response: any) => {
                    this.messageService.add({
                        severity: 'success',
                        closable: true,
                        life: 5000,
                        detail: `Le mot de passe a été modifié avec succès`
                    });
                },
                (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        closable: true,
                        life: 5000,
                        detail: `Le mot de passe n'a pas pu être modifié`
                    });
                },
                () => {
                    setTimeout(() => {
                        this.router.navigateByUrl(`/account`);
                        this.messageService.clear();
                    }, 2250);
                }
            );
        }
    }

    private setChangePasswordForm(): void {
        this.changePasswordForm = new FormGroup({
            currentPassword: new FormControl('', [
                Validators.required
            ]),
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

        this.changePasswordForm.setValidators(
            Validators.compose([
                ConfirmPasswordValidator()
            ])
        );
    }

    private mapChangePasswordFormToCommand(): ChangePasswordCommand {
        return new ChangePasswordCommand(
            this.accountService.get()?.email,
            this.changePasswordForm.value.currentPassword,
            this.changePasswordForm.value.password
        );
    }
}
