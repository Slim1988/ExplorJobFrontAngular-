import { Component, Input, OnInit } from '@angular/core';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { JobUser } from './../../../jobs/models/job-user.model';

@Component({
    selector: 'account-job',
    templateUrl: './account-job.component.html',
    styleUrls: [
        './account-job.component.css'
    ]
})
export class AccountJobComponent extends ParentComponent implements OnInit {
    @Input()
    public job: JobUser;

    public constructor() {
        super();
    }

    public ngOnInit(): void { }
}
