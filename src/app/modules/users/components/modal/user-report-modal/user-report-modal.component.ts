import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng';
import * as R from 'ramda';
import { AccountService } from '../../../../account/services/account.service';
import { UserReportedCreateCommand } from '../../../commands/user-reported-create.command';
import { UserReportModalEvents } from '../../../events/user-report-modal.events';
import { UserPublic } from '../../../models/user-public.model';
import { User } from '../../../models/user.model';
import { UserReportingProvider } from '../../../providers/user-reporting.provider';
import { ParentComponent } from './../../../../../infrastructure/components/parent.component';
import { Account } from './../../../../account/models/account.model';
import { UserReportingReason } from './../../../models/user-reporting-reason.model';

@Component({
    selector: 'user-report-modal',
    templateUrl: './user-report-modal.component.html',
    styleUrls: [
        './user-report-modal.component.css'
    ]
})
export class UserReportModalComponent extends ParentComponent implements OnInit, DoCheck {
    @Input()
    public user: User|UserPublic|null;

    @Output()
    public events: EventEmitter<string> = new EventEmitter();

    public userReportForm: FormGroup;

    public display: boolean = false;

    public userReportingReasons: Array<UserReportingReason>;
    public userReportingReasonsDropdown: Array<SelectItem> = [];
    public userReportingReasonsDropdownSelected: SelectItem = null;

    private account: Account|null;

    public constructor(
        private readonly accountService: AccountService,
        private readonly userReportingProvider: UserReportingProvider
    ) {
        super();
        this.setUserReportForm();
    }

    public ngOnInit(): void { }

    public ngDoCheck(): void {
        if (R.isNil(this.account)) {
            this.load();
        }
    }

    public showModal(): void {
        this.setUserReportForm();
        this.display = true;
    }

    public hideModal(): void {
        this.display = false;
    }

    public report(): void {
        if (this.userReportForm.valid) {
            this.userReportingProvider.create(
                this.mapUserReportFormToCommand()
            ).subscribe(
                (response: any) => {
                    this.events.emit(
                        UserReportModalEvents.SentOK
                    );
                },
                (error: any) => {
                    this.events.emit(
                        UserReportModalEvents.SentButError
                    );
                },
                () => {
                    this.hideModal();
                }
            );
        }
        else {
            this.hideModal();
        }
    }

    public handleModalClose(): void {
        this.events.emit(
            UserReportModalEvents.NotSent
        );

        this.hideModal();
    }

    private load(): void {
        this.account = this.accountService.get();
        this.getReportingReasons();
    }

    private setUserReportForm(): void {
        this.userReportForm = new FormGroup({
            reason: new FormControl('', [
                Validators.required
            ])
        });

        this.userReportForm.setValue({
            reason: null
        });

        this.userReportingReasonsDropdownSelected = null;
    }

    private mapUserReportFormToCommand(): UserReportedCreateCommand {
        return new UserReportedCreateCommand(
            this.account.id,
            this.user.id,
            this.userReportForm.value.reason
        );
    }

    private getReportingReasons(): void {
        this.userReportingProvider.getAllReportingReasons().subscribe(
            (userReportingReasons: Array<UserReportingReason>) => this.userReportingReasons = userReportingReasons,
            (error: any) => null,
            () => {
                this.userReportingReasonsDropdown = [];

                this.userReportingReasons.map(
                    (userReportingReason: UserReportingReason) => this.userReportingReasonsDropdown.push({
                        label: userReportingReason.label,
                        value: userReportingReason.id
                    } as SelectItem)
                );
            }
        );
    }
}
