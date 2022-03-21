import { HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as R from 'ramda';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { AccountPhotoUploadEvents } from '../../events/account-photo-upload.events';
import { AccountProvider } from '../../providers/account.provider';
import { AccountService } from '../../services/account.service';
import { Account } from './../../models/account.model';

@Component({
    selector: 'account-photo-upload',
    templateUrl: './account-photo-upload.component.html',
    styleUrls: [
        './account-photo-upload.component.css'
    ]
})
export class AccountPhotoUploadComponent extends ParentComponent implements OnInit {
    @Output()
    public events: EventEmitter<string> = new EventEmitter();

    public progress: number;

    private file: File;

    public constructor(
        private readonly accountService: AccountService,
        private readonly accountProvider: AccountProvider
    ) {
        super();
    }

    public ngOnInit(): void { }

    public uploadFile = (
        files: Array<File>
    ): void => {
        if (files.length > 0) {
            this.file = files[0];

            if (!R.isNil(this.file)) {
                const account: Account|null = this.accountService.get();

                if (!R.isNil(account)) {
                    this.accountProvider.uploadPhoto(
                        this.mapToFormData(
                            account.id,
                            this.file
                        )
                    ).subscribe(
                        (event: HttpProgressEvent) => {
                            switch ((event as any).type) {
                                case HttpEventType.UploadProgress:
                                    this.progress = Math.round(
                                        100 * event.loaded / event.total
                                    );
                                    break;

                                case HttpEventType.Response:
                                    this.events.emit(
                                        AccountPhotoUploadEvents.Uploaded
                                    );
                                    break;

                                default:
                                    break;
                            }
                        },
                        (error: any) => { },
                        () => {
                            setTimeout(() => this.progress = null, 2250);
                        }
                    );
                }
            }
        }
    }

    private mapToFormData(
        accountId: string,
        file: File
    ): FormData {
        const formData: FormData = new FormData();

        formData.append(
            'file',
            file,
            accountId
        );

        return formData;
    }
}
