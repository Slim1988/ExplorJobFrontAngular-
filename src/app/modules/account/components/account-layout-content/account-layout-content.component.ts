import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, EventEmitter } from '@angular/core';
import * as R from 'ramda';
import { ParentComponent } from '../../../../infrastructure/components/parent.component';
import { AccountMenu } from '../../models/account-menu.model';
import { AccountMessagingComponent } from '../account-messaging/account-messaging.component';

@Component({
    selector: 'account-layout-content',
    templateUrl: './account-layout-content.component.html',
    styleUrls: ['./account-layout-content.component.css'],
})
export class AccountLayoutContentComponent
    extends ParentComponent
    implements OnInit {
    @Input()
    public menuItemSelected: string;

    @ViewChild(AccountMessagingComponent) accountMessaging:AccountMessagingComponent;
    @Output('sendNumberOfUnreadMessage')
    sendNumberOfUnreadMessageEmitter : EventEmitter<number> = new EventEmitter<number>(); 
    public numberOfUnreadMessage : number;
    
    public constructor() {
        super();
    }

    public ngOnInit(): void {

    }

    public displayAccountProfileGeneralInformations(): boolean {
        return (
            R.isNil(this.menuItemSelected) ||
            R.equals(
                AccountMenu.AccountProfileGeneralInformations,
                this.menuItemSelected.toString()
            )
        );
    }

    public displayAccountProfileContactInformations(): boolean {
        return (
            !R.isNil(this.menuItemSelected) &&
            R.equals(
                AccountMenu.AccountProfileContactInformations,
                this.menuItemSelected.toString()
            )
        );
    }

    public displayAccountProfileSituationInformations(): boolean {
        return (
            !R.isNil(this.menuItemSelected) &&
            R.equals(
                AccountMenu.AccountProfileSituationInformations,
                this.menuItemSelected.toString()
            )
        );
    }

    public displayAccountMessaging(): boolean {
        return (
            !R.isNil(this.menuItemSelected) &&
            R.equals(
                AccountMenu.AccountMessaging,
                this.menuItemSelected.toString()
            )
        );
    }
    public displayAccountAppointments(): boolean {
        return (
            !R.isNil(this.menuItemSelected) &&
            R.equals(
                AccountMenu.AccountAppointments,
                this.menuItemSelected.toString()
            )
        );
    }
    public displayAccountFavorites(): boolean {
        return (
            !R.isNil(this.menuItemSelected) &&
            R.equals(
                AccountMenu.AccountFavorites,
                this.menuItemSelected.toString()
            )
        );
    }

    public displayAccountJobs(): boolean {
        return (
            !R.isNil(this.menuItemSelected) &&
            R.equals(AccountMenu.AccountJobs, this.menuItemSelected.toString())
        );
    }

    public displayAccountChangePassword(): boolean {
        return (
            !R.isNil(this.menuItemSelected) &&
            R.equals(
                AccountMenu.AccountChangePassword,
                this.menuItemSelected.toString()
            )
        );
    }

    public displayAccountBecomeProfessional(): boolean {
        return (
            !R.isNil(this.menuItemSelected) &&
            R.equals(
                AccountMenu.AccountBecomeProfessional,
                this.menuItemSelected.toString()
            )
        );
    }
    public onSelectConversation(numberOfMessage:number): void {
        this.numberOfUnreadMessage = numberOfMessage;
        this.sendNumberOfUnreadMessage();   
    }
    
    public sendNumberOfUnreadMessage() : void {
        this.sendNumberOfUnreadMessageEmitter.emit(this.numberOfUnreadMessage);
    }
}
