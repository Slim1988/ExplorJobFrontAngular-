import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng';
import { EncoderService } from '../../../../infrastructure/services/encoder.service';
import { ConfirmEmailCommand } from '../../commands/confirm-email.command';
import { AuthProvider } from '../../providers/auth.provider';
import { AuthService } from '../../services/auth.service';
import { ParentComponent } from './../../../../infrastructure/components/parent.component';

@Component({
    selector: 'confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: [
        './confirm-email.component.css'
    ],
    providers: [
        MessageService
    ]
})
export class ConfirmEmailComponent extends ParentComponent implements OnInit {
    public loaded: boolean = false;

    private email: string;
    private token: string;

    public constructor(
        private readonly authService: AuthService,
        private readonly authProvider: AuthProvider,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly encoderService: EncoderService,
        private readonly messageService: MessageService
    ) {
        super();
    }

    public ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/account');
        }

        this.email = this.encoderService.decode(
            this.route.snapshot.paramMap.get('email')
        );

        this.token = this.encoderService.decode(
            this.route.snapshot.paramMap.get('token')
        );

        this.confirmEmail();
    }

    private async confirmEmail(): Promise<void> {
        this.messageService.clear();

        await this.authProvider.confirmEmail(
            this.confirmEmailCommand()
        ).subscribe(
            (response: any) => {
                this.messageService.add({
                    severity: 'success',
                    closable: true,
                    detail: `Votre email a bien été confirmé`
                });

                setTimeout(() => {
                    this.router.navigateByUrl('/login');
                }, 5000);
            },
            (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    closable: true,
                    detail: `Erreur lors de la confirmation`
                });
            }
        );

        this.loaded = true;
    }

    private confirmEmailCommand(): ConfirmEmailCommand {
        return new ConfirmEmailCommand(
            this.email,
            this.token
        );
    }
}
