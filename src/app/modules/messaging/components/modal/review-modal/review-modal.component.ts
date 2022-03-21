import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ParentComponent } from '../../../../../infrastructure/components/parent.component';
import { MeetingCanellationReason } from '../../../../account/models/meetingCanellationReason';
import { MeetingDuration } from '../../../../account/models/meetingDuration';
import { MeetingPlateform } from '../../../../account/models/meetingPlateform';
import { Role } from 'src/app/modules/account/models/role';
import { IsExplorerGood } from 'src/app/modules/account/models/isExplorerGood';
import { AccountService } from '../../../../account/services/account.service';
import { SendReviewCommand } from '../../../commands/SendReviewCommand';
import { MessageEvents } from '../../../events/message.events';
import { MessagingProvider } from '../../../providers/messaging.provider';
import { Account } from './../../../../account/models/account.model';
import { JobUser } from 'src/app/modules/jobs/models/job-user.model';
import { JobUsersProvider } from 'src/app/modules/jobs/providers/job-users.provider';
import { Observable } from 'rxjs';
import { AccountProvider } from 'src/app/modules/account/providers/account.provider';


// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
export interface ShowReviewModalOptions {
    commonId: string;
    proposalId: string;
    display: boolean;
    conversationId: string;
    interlocutorName: string;
    receiverId: string;
    emitterId: string; // explorer
}

function conditionalRequired(condition: boolean) {
    return condition ? Validators.required : Validators.nullValidator;
}

@Component({
    selector: 'review-modal',
    templateUrl: './review-modal.component.html',
    styleUrls: ['./review-modal.component.css'],
})
export class ReviewModalComponent extends ParentComponent implements OnInit {
    public reviewForm: FormGroup;
    public hasMet: boolean;
    public jobs$: Observable<JobUser[]>;
    public jobs: JobUser[]; // value of the observable
    public userId: string;
    public isOtherPersonProfessional: boolean;
    @Input()
    public options: ShowReviewModalOptions;

    @Output()
    public events: EventEmitter<string> = new EventEmitter();
    public constructor(
        private readonly messagingProvider: MessagingProvider,
        private readonly accountService: AccountService,
        private readonly jobProvider: JobUsersProvider
    ) {
        super();
    }
    public get Role(): typeof Role {
        return Role;
    }
    public get IsExplorerGood(): typeof IsExplorerGood {
        return IsExplorerGood;
    }
    public get MeetingPlateform(): typeof MeetingPlateform {
        return MeetingPlateform;
    }
    public get MeetingDuration(): typeof MeetingDuration {
        return MeetingDuration;
    }
    public get MeetingCanellationReason(): typeof MeetingCanellationReason {
        return MeetingCanellationReason;
    }
    public init(): void {
        let account: Account = this.accountService.get();
        this.userId = account.id;
        this.jobs = [];

        this.reviewForm = new FormGroup({
            hasMet: new FormControl(Validators.required),
            whatWereYou: new FormControl(),
            whichJob: new FormControl(),
            meetingQuality: new FormControl(),
            meetingPlateform: new FormControl(),
            meetingDuration: new FormControl(),
            meetingCanellationReason: new FormControl(),
            meetingCanellationReasonOther: new FormControl(),
            recommendation: new FormControl(),
            doTheSame: new FormControl(),
            sameCompany: new FormControl(),
            isExplorerGood: new FormControl(),
            isExplorerInterestingForCompany: new FormControl(),
            otherComment: new FormControl(),
        });
        
    }
    public ngOnInit(): void {
        this.init();

        this.reviewForm.get('hasMet').valueChanges.subscribe((value) => 
        {
            if (value !== undefined) 
            {
                this.reviewForm
                    .get('hasMet')
                    .setValidators(Validators.required);
                this.reviewForm
                    .get('recommendation')
                    .setValidators(Validators.required);

                this.reviewForm
                    .get('whatWereYou')
                    .setValidators(conditionalRequired(JSON.parse(value)));
                this.reviewForm
                    .get('whichJob')
                    .setValidators(conditionalRequired(JSON.parse(value)));
                    this.reviewForm
                    .get('sameCompany')
                    .setValidators(conditionalRequired(JSON.parse(value) && this.IsExplorerInThisContext()));
                this.reviewForm
                    .get('doTheSame')
                    .setValidators(conditionalRequired(JSON.parse(value) && this.IsExplorerInThisContext()));
                this.reviewForm
                    .get('isExplorerGood')
                    .setValidators(conditionalRequired(JSON.parse(value) && !this.IsExplorerInThisContext()));
                this.reviewForm
                    .get('isExplorerInterestingForCompany')
                    .setValidators(Validators.nullValidator);
                this.reviewForm
                    .get('meetingQuality')
                    .setValidators(conditionalRequired(JSON.parse(value)));
                this.reviewForm
                    .get('meetingPlateform')
                    .setValidators(conditionalRequired(JSON.parse(value)));
                this.reviewForm
                    .get('meetingDuration')
                    .setValidators(conditionalRequired(JSON.parse(value)));

                this.reviewForm
                    .get('meetingCanellationReason')
                    .setValidators(conditionalRequired(!JSON.parse(value)));
                // reset all values except HasMet
                this.reviewForm.get('whatWereYou').setValue(null);
                this.reviewForm.get('whichJob').setValue(null);
                this.reviewForm.get('sameCompany').setValue(null);
                this.reviewForm.get('doTheSame').setValue(null);
                this.reviewForm.get('isExplorerGood').setValue(null);
                this.reviewForm.get('isExplorerInterestingForCompany').setValue(null);
                this.reviewForm.get('meetingQuality').setValue(null);
                this.reviewForm.get('meetingPlateform').setValue(null);
                this.reviewForm.get('meetingDuration').setValue(null);
                this.reviewForm.get('recommendation').setValue(null);
                this.reviewForm.get('meetingCanellationReason').setValue(null);
                this.reviewForm.get('meetingCanellationReasonOther').setValue(null);

                if (value === 'true') 
                {
                    //We are able to know this from the beginning, so we check by default
                    if(this.IsExplorerInThisContext()) 
                    {
                        this.reviewForm.get('whatWereYou').setValue(Role.Explorer);
                    }
                    else
                    {
                        this.reviewForm.get('whatWereYou').setValue(Role.Professional);
                    }
                    // get the JobUser list depending on the current situation
                    if(this.IsExplorerInThisContext())
                    {
                        this.jobs$ = this.jobProvider.getAllByUserId(this.getOtherPersonId());
                    }
                    else
                    {
                        this.jobs$ = this.jobProvider.getAllByUserId(this.userId);
                    }
                    this.jobs$.subscribe(value => {
                        this.jobs = value;
                        // only one job in the list ? we check it by default
                        if(this.jobs.length == 1)
                        {
                            this.reviewForm.get('whichJob').setValue(this.jobs[0].id);
                        }
                    });
                }           
            }
        });
        this.reviewForm
            .get('meetingCanellationReason')
            .valueChanges.subscribe((value) => {
                if (value !== undefined) {
                    if (value === MeetingCanellationReason.Other) {
                        this.reviewForm.get('meetingCanellationReasonOther').setValidators(Validators.required);
                    }
                    else{
                        this.reviewForm.get('meetingCanellationReasonOther').setValidators(Validators.nullValidator);
                    }
                }
            });
            this.reviewForm.get('isExplorerGood')
            .valueChanges.subscribe((value) => {
                if (value !== undefined) {
                    if (value === IsExplorerGood.Yes || value === IsExplorerGood.ImpossibleToJudge) {
                        this.reviewForm.get('isExplorerInterestingForCompany').setValidators(Validators.required);
                    }
                    else{
                        this.reviewForm.get('isExplorerInterestingForCompany').setValidators(Validators.nullValidator);
                    }
                }
            });
    }
    public handleModalClose(form: FormGroupDirective): void {
        this.reviewForm.reset();
        form.resetForm();
        this.events.emit(MessageEvents.NotSent);
    }

    public onFormSubmit(form: FormGroupDirective): void {
        //let uwu = this.findInvalidControlsRecursive(this.reviewForm); // testing
        //let owo = this.reviewForm.get('meetingCanellationReason').invalid; // testing
        if (
            this.reviewForm.touched &&
            this.reviewForm.valid &&
            this.reviewForm.get('hasMet').value !== undefined &&
            this.reviewForm.get('recommendation').value !== undefined &&
            this.reviewForm.get('recommendation').value !== null
        ) {
            this.messagingProvider
                .sendReview(this.mapReviewFormToSendCommand())
                .subscribe(
                    (response: any) => {
                        this.init();
                        this.events.emit(MessageEvents.SentOK);
                    },
                    (error: any) => {
                        this.events.emit(MessageEvents.SentButError);
                    },
                    () => {
                        form.resetForm();
                    }
                );
        }
    }
    private mapReviewFormToSendCommand(): SendReviewCommand {

        return new SendReviewCommand(
            this.options.proposalId,
            this.userId,
            this.options.receiverId,
            this.options.commonId,
            this.reviewForm.get('hasMet').value,
            this.reviewForm.get('whatWereYou').value,
            this.reviewForm.get('whichJob').value,
            this.reviewForm.get('meetingQuality').value,
            this.reviewForm.get('recommendation').value,
            this.reviewForm.get('doTheSame').value,
            this.reviewForm.get('sameCompany').value,
            this.reviewForm.get('isExplorerGood').value,
            this.reviewForm.get('isExplorerInterestingForCompany').value,
            this.reviewForm.get('meetingPlateform').value,
            this.reviewForm.get('meetingDuration').value,
            this.reviewForm.get('meetingCanellationReason').value,
            this.reviewForm.get('otherComment').value,
            this.reviewForm.get('meetingCanellationReasonOther').value
        );
    }

    private getOtherPersonId(): string
    {
        if(this.userId === this.options.emitterId)
        {
            return this.options.receiverId;
        }
        else
        {
            return this.options.emitterId;
        }
    }
    // The idea is to get if you were the explorer in that meeting based on who sent the first message of the conversation ( which is always an explorer )
    public IsExplorerInThisContext(): boolean
    {
        return this.userId === this.options.emitterId;
    }

    /* 
    TESTING PURPOSE
    Returns an array of invalid control/group names, or a zero-length array if 
    no invalid controls/groups where found 
    */
    public findInvalidControlsRecursive(formToInvestigate:FormGroup|FormArray):string[] 
    {
        var invalidControls:string[] = [];
        let recursiveFunc = (form:FormGroup|FormArray) => {
        Object.keys(form.controls).forEach(field => { 
            const control = form.get(field);
            if (control.invalid) invalidControls.push(field);
            if (control instanceof FormGroup) {
            recursiveFunc(control);
            } else if (control instanceof FormArray) {
            recursiveFunc(control);
            }        
        });
        }
        recursiveFunc(formToInvestigate);
        return invalidControls;
    }
}
