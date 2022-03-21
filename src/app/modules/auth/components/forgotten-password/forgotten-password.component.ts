import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { ForgottenPasswordCommand } from '../../commands/forgotten-password.command';
import { AuthProvider } from '../../providers/auth.provider';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'forgotten-password',
    templateUrl: './forgotten-password.component.html',
    styleUrls: [
        './forgotten-password.component.css'
    ],
    providers: [
        MessageService
    ]
})
export class ForgottenPasswordComponent extends ParentComponent implements OnInit {
    public forgottenPasswordForm: FormGroup;

    public constructor(
        private readonly authService: AuthService,
        private readonly authProvider: AuthProvider,
        private readonly router: Router,
        private readonly messageService: MessageService
    ) {
        super();
        this.setForgottenPasswordForm();
    }

    public ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/account');
        }
    }

    public async forgottenPassword(): Promise<void> {
        if (this.forgottenPasswordForm.valid) {
            this.messageService.clear();

            await this.authProvider.forgottenPassword(
                this.mapForgottenPasswordFormToCommand()
            ).subscribe(
                (response: any) => {
                    this.messageService.add({
                        severity: 'info',
                        closable: true,
                        detail: `Utilisez le lien reçu par email pour réinitialiser votre mot de passe`
                    });

                    setTimeout(() => {
                        this.router.navigateByUrl('/login');
                    }, 5000);
                },
                (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        closable: true,
                        detail: `L'email n'existe pas`
                    });
                }
            );
        }
    }

    private setForgottenPasswordForm(): void {
        this.forgottenPasswordForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ])
        });
    }

    private mapForgottenPasswordFormToCommand(): ForgottenPasswordCommand {
        return new ForgottenPasswordCommand(
            this.forgottenPasswordForm.value.email
        );
    }
}
