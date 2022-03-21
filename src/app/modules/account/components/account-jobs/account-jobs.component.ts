import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng';
import * as R from 'ramda';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { JobUserCreateCommand } from '../../../jobs/commands/job-user-create.command';
import { JobUserUpdateCommand } from '../../../jobs/commands/job-user-update.command';
import { JobDomain } from '../../../jobs/models/job-domain.model';
import { JobUser } from '../../../jobs/models/job-user.model';
import { JobDomainsProvider } from '../../../jobs/providers/job-domains.provider';
import { JobUsersProvider } from '../../../jobs/providers/job-users.provider';
import { AccountEvents } from '../../events/account.events';
import { AccountService } from '../../services/account.service';
import { JobUserDeleteCommand } from './../../../jobs/commands/job-user-delete.command';
import { Account } from './../../models/account.model';

@Component({
    selector: 'account-jobs',
    templateUrl: './account-jobs.component.html',
    styleUrls: [
        './account-jobs.component.css'
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class AccountJobsComponent extends ParentComponent implements OnInit, DoCheck, OnDestroy {
    public jobs: Array<JobUser> = null;

    public jobForm: FormGroup;
    public displayJobFormModal: boolean = false;

    public jobDomains: Array<JobDomain>;
    public jobDomainsDropdown: Array<SelectItem> = [];

    public jobUsersAllCompanies: Array<string> = [];
    public jobUsersFilteredCompanies: Array<string> = [];

    private account: Account | null;

    public constructor(
        private readonly accountService: AccountService,
        private readonly jobUsersProvider: JobUsersProvider,
        private readonly jobDomainsProvider: JobDomainsProvider,
        private readonly confirmationService: ConfirmationService,
        private readonly messageService: MessageService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.accountService.events.subscribe(
            (event: any) => {
                if (R.equals(
                    R.toString(event),
                    AccountEvents.IsLoaded
                ) || R.equals(
                    R.toString(event),
                    AccountEvents.WasUpdated
                )) {
                    this.load();
                }
            }
        );
    }

    public ngDoCheck(): void {
        if (R.isNil(this.jobs)) {
            this.load();
        }
    }

    public ngOnDestroy(): void {
        this.account = null;
    }

    public searchCompanies(event: any) {
        this.jobUsersFilteredCompanies = this.jobUsersAllCompanies
            .filter(
                (company: string) => company.toLowerCase().includes(
                    String(event.query).toLowerCase()
                )
            )
            .map((company: string) =>
                company.charAt(0).toUpperCase().concat(company.slice(1))
            );
    }

    public onClearCompaniesInput(event: any) {
        this.jobUsersFilteredCompanies = this.jobUsersAllCompanies;
    }

    public displayModalToAddJob(): void {
        this.getJobUsersCompanies();
        this.setJobForm();
        this.setJobFormValues(
            JobUser.New(
                !R.isNil(this.account)
                    ? this.account.id
                    : null
            )
        );
        this.displayJobFormModal = true;
    }

    public displayModalToEditJob(
        job: JobUser
    ): void {
        this.getJobUsersCompanies();
        this.setJobForm();
        this.setJobFormValues(
            job
        );
        this.displayJobFormModal = true;
    }

    public submitJobForm(): void {
        if (this.jobForm.valid) {
            if (this.jobForm.value.isAdd) {
                this.addJob();
            }
            else {
                this.editJob();
            }
        }
    }

    public deleteJob(
        job: JobUser
    ): void {
        this.confirmationService.confirm({
            message: `Êtes vous sûr de vouloir supprimer ce métier ?`,
            header: 'Confirmation de suppression',
            icon: 'fa fa-trash red',
            accept: () => {
                this.messageService.clear();

                this.jobUsersProvider.delete(
                    this.mapJobToDeleteCommand(job)
                ).subscribe(
                    (response: any) => {
                        this.messageService.add({
                            severity: 'success',
                            closable: true,
                            detail: `Le métier a été supprimé avec succès`
                        });

                        setTimeout(() => {
                            this.messageService.clear();
                        }, 5000);
                    },
                    (error: any) => {
                        this.messageService.add({
                            severity: 'error',
                            closable: true,
                            detail: `Le métier n'a pas pu être supprimé`
                        });
                    },
                    () => {
                        this.accountService.reload().then(
                            () => this.reload()
                        );
                    }
                );
            },
            reject: () => null
        });
    }

    private addJob(): void {
        this.messageService.clear();
        this.displayJobFormModal = false;

        this.jobUsersProvider.create(
            this.mapJobFormToCreateCommand()
        ).subscribe(
            (response: any) => {
                this.messageService.add({
                    severity: 'success',
                    closable: true,
                    detail: `Le métier a été créé avec succès`
                });

                setTimeout(() => {
                    this.messageService.clear();
                }, 5000);
            },
            (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    closable: true,
                    detail: `Le métier n'a pas pu être créé`
                });
            },
            () => {
                this.accountService.reload().then(
                    () => this.reload()
                );
            }
        );
    }

    private editJob(): void {
        this.messageService.clear();
        this.displayJobFormModal = false;

        this.jobUsersProvider.update(
            this.mapJobFormToUpdateCommand()
        ).subscribe(
            (response: any) => {
                this.messageService.add({
                    severity: 'success',
                    closable: true,
                    detail: `Le métier a été modifié avec succès`
                });

                setTimeout(() => {
                    this.messageService.clear();
                }, 5000);
            },
            (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    closable: true,
                    detail: `Le métier n'a pas pu être modifié`
                });
            },
            () => {
                this.accountService.reload().then(
                    () => this.reload()
                );
            }
        );
    }

    private setJobForm(): void {
        this.jobForm = new FormGroup({
            isAdd: new FormControl('', [
                Validators.required
            ]),
            id: new FormControl('', []),
            domains: new FormControl('', [
                Validators.required
            ]),
            label: new FormControl('', [
                Validators.required,
                Validators.maxLength(
                    CONFIG.restrictions.jobs.label.maxLength
                )
            ]),
            company: new FormControl('', [
                Validators.maxLength(
                    CONFIG.restrictions.jobs.company.maxLength
                )
            ]),
            presentation: new FormControl('', [
                Validators.required,
                Validators.maxLength(
                    CONFIG.restrictions.jobs.presentation.maxLength
                )
            ])
        });
    }

    private setJobFormValues(
        job: JobUser
    ): void {
        if (!R.isNil(this.jobForm)) {
            this.jobForm.setValue({
                isAdd: R.isNil(job.id),
                id: job.id,
                domains: !R.isNil(job.domains) && job.domains.length > 0
                    ? { label: job.domains[0].label, value: job.domains[0].id } as SelectItem
                    : [],
                label: job.label,
                company: job.company,
                presentation: job.presentation
            });
        }
    }

    private reload(): void {
        setTimeout(() => {
            this.account = null;
            this.jobs = [];
            this.load();

            if (R.isNil(this.account)) {
                this.reload();
            }
        }, 675);
    }

    private load(): void {
        this.account = this.accountService.get();

        if (!R.isNil(this.account)) {
            this.jobs = this.account.jobs;
            this.getJobDomains();
        }
    }

    private mapJobFormToCreateCommand(): JobUserCreateCommand {
        return new JobUserCreateCommand(
            [this.jobForm.value.domains.value],
            this.jobForm.value.label,
            typeof this.jobForm.value.company === 'string'
                ? this.jobForm.value.company.charAt(0).toUpperCase().concat(this.jobForm.value.company.slice(1))
                : this.jobForm.value.company,
            this.jobForm.value.presentation,
            this.account.id
        );
    }

    private mapJobFormToUpdateCommand(): JobUserUpdateCommand {
        return new JobUserUpdateCommand(
            this.jobForm.value.id,
            [this.jobForm.value.domains.value],
            this.jobForm.value.label,
            typeof this.jobForm.value.company === 'string'
                ? this.jobForm.value.company.charAt(0).toUpperCase().concat(this.jobForm.value.company.slice(1))
                : this.jobForm.value.company,
            this.jobForm.value.presentation,
            this.account.id
        );
    }

    private mapJobToDeleteCommand(
        job: JobUser
    ): JobUserDeleteCommand {
        return new JobUserDeleteCommand(
            job.id,
            job.userId
        );
    }

    private getJobDomains(): void {
        this.jobDomainsProvider.getAll().subscribe(
            (jobDomains: Array<JobDomain>) => this.jobDomains = jobDomains,
            (error: any) => null,
            () => {
                this.jobDomainsDropdown = [];

                this.jobDomains.map(
                    (jobDomain: JobDomain) => this.jobDomainsDropdown.push({
                        label: jobDomain.label,
                        value: jobDomain.id
                    } as SelectItem)
                );
            }
        );
    }

    private getJobUsersCompanies(): void {
        this.jobUsersProvider.getAllCompanies().subscribe(
            (companies: Array<string>) => {
                this.jobUsersAllCompanies = companies
                    .map(
                        (company: string) => !R.isNil(company) &&
                            company.charAt(0).toUpperCase().concat(company.slice(1))
                    )
                    .filter(
                        (company: string) => typeof company === 'string'
                    );
            },
            () => null,
            () => {},
        );
    }
}
