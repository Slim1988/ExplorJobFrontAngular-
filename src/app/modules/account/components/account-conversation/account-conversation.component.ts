import { Component, Input, OnInit } from '@angular/core';
import * as R from 'ramda';
import { CONFIG } from '../../../../config/config';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { JobUser } from '../../../jobs/models/job-user.model';
import { JobUsersProvider } from '../../../jobs/providers/job-users.provider';
import { UsersService } from '../../../users/services/users.service';
import { AccountService } from '../../services/account.service';
import { AccountConversation } from './../../models/account-conversation.model';
import { Account } from './../../models/account.model';

@Component({
    selector: 'account-conversation',
    templateUrl: './account-conversation.component.html',
    styleUrls: [
        './account-conversation.component.css'
    ]
})
export class AccountConversationComponent extends ParentComponent implements OnInit {
    @Input()
    public conversation: AccountConversation;

    public jobs: Array<JobUser> = null;

    public constructor(
        private readonly accountService: AccountService,
        private readonly usersService: UsersService,
        private readonly jobUsersProvider: JobUsersProvider
    ) {
        super();
    }

    public ngOnInit(): void { }

    public interlocutorPhotoDefault(): string {
        return CONFIG.explorJob.users.photo.default;
    }

    public userTitle(): string {
        if (!R.isNil(this.conversation)
        && !R.isNil(this.conversation.interlocutorId)
        && !R.isNil(this.conversation.interlocutor)
        ) {
            let account: Account|null = null;
            let jobs: Array<JobUser>|null =  null;

            if (!this.usersService.isUserExplorer(
                this.conversation.interlocutor
            )) {
                account = this.accountService.get();

                if (!R.isNil(account)) {
                    if (R.isNil(this.jobs)) {
                        this.loadJobs();
                    }
                    else {
                        jobs = this.jobs;
                    }
                }
            }

            return this.usersService.userTitle(
                this.conversation.interlocutor,
                null,
                jobs,
                !R.isNil(account)
                    ? account
                    : null
            );
        }
        else {
            return this.usersService.userTitle(
                null
            );
        }
    }

    private async loadJobs(): Promise<void> {
        this.jobs = [];

        await this.jobUsersProvider.getAllByUserId(
            this.conversation.interlocutorId
        ).subscribe(
            (jobs: Array<JobUser>) => this.jobs = jobs,
            (error: any) => { throw error; },
            () => { }
        );
    }
}
