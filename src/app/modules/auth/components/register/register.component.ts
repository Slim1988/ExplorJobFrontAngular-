import { Component, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng';
import * as R from 'ramda';
import { environment } from '../../../../../environments/environment';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { RegisterCommand } from '../../commands/register.command';
import { RegisterType } from '../../models/register-type.model';
import { AuthService } from '../../services/auth.service';
import { ConfirmEmailValidator } from '../../validators/confirm-email-validator';
import { ConfirmPasswordValidator } from '../../validators/confirm-password.validator';
import { MaterialDatepickerService } from './../../../../infrastructure/services/material-datepicker.service';
import { AuthProvider } from './../../providers/auth.provider';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: [
        './register.component.css'
    ],
    providers: [
        MessageService,
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'fr-FR'
        },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MAT_MOMENT_DATE_FORMATS
        },
    ]
})
export class RegisterComponent extends ParentComponent implements OnInit {
    public registerForm: FormGroup;
    public zipCodeMask: string = CONFIG.masks.zipCode;
    private registerType: string;

    @ViewChild('windowTop')
    public windowTop: HTMLElement|any;

    public constructor(
        private readonly authService: AuthService,
        private readonly authProvider: AuthProvider,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly messageService: MessageService,
        private readonly materialDatepickerService: MaterialDatepickerService
    ) {
        super();
        this.setRegisterForm();
    }

    public ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/account');
        }

        this.registerType = this.route.snapshot.paramMap.get('type');
    }

    public registrationIsEnable(): boolean {
        return environment.account.registration.enable;
    }

    public async register(): Promise<void> {
        if (this.registerForm.valid) {
            this.messageService.clear();

            await this.authProvider.register(
                this.mapRegisterFormToCommand()
            ).subscribe(
                (response: any) => {
                    this.messageService.add({
                        severity: 'info',
                        closable: true,
                        detail: `Un email vient de vous être envoyé pour valider votre inscription. Vous devez le valider avant de pouvoir accéder à votre compte. Pensez à vérifier vos indésirables.`
                    });
                },
                (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        closable: true,
                        detail: `Le compte n'a pas pu être créé`
                    });
                }
            );

            setTimeout(() => this.windowTop.nativeElement.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            }), 900);

            setTimeout(() => {
                this.messageService.clear();
            }, 5000);
        }
    }

    public clearRegisterFormEmail(): void {
        this.registerForm.controls.email.setValue(
            R.trim(this.registerForm.value.email)
        );
    }

    public clearRegisterFormConfirmEmail(): void {
        this.registerForm.controls.confirmEmail.setValue(
            R.trim(this.registerForm.value.confirmEmail)
        );
    }

    private setRegisterForm(): void {
        this.registerForm = new FormGroup({
            addressZipCode: new FormControl('', [
                Validators.required
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            confirmEmail: new FormControl('', [
                Validators.required
            ]),
            firstName: new FormControl('', [
                Validators.required,
                Validators.minLength(
                    CONFIG.restrictions.users.firstName.minLength
                ),
                Validators.maxLength(
                    CONFIG.restrictions.users.firstName.maxLength
                )
            ]),
            lastName: new FormControl('', [
                Validators.required,
                Validators.minLength(
                    CONFIG.restrictions.users.lastName.minLength
                ),
                Validators.maxLength(
                    CONFIG.restrictions.users.lastName.maxLength
                )
            ]),
            birthDate: new FormControl('', [
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
            ]),
            acceptCGU: new FormControl('', [
                Validators.required
            ]),
            acceptLegalNotices: new FormControl('', [
                Validators.required
            ])
        });

        this.registerForm.setValidators(
            Validators.compose([
                ConfirmPasswordValidator(),
                ConfirmEmailValidator()
            ])
        );
    }

    private mapRegisterFormToCommand(): RegisterCommand {
        return new RegisterCommand(
            this.registerForm.value.email,
            this.registerForm.value.firstName,
            this.registerForm.value.lastName,
            !R.isNil(this.registerForm.value.birthDate)
                ? this.materialDatepickerService.fixIssueFromDatepickerUTC(
                    new Date(this.registerForm.value.birthDate)
                )
                : null,
            this.registerForm.value.password,
            this.registerTypeIsProfessional(),
            [
                CONFIG.contracts.cgu.id,
                CONFIG.contracts.legalNotices.id
            ],
            this.registerForm.value.addressZipCode
        );
    }

    private registerTypeIsProfessional(): boolean {
        return !R.isNil(this.registerType)
            && R.equals(
                this.registerType,
                RegisterType.Professional
            );
    }
}
