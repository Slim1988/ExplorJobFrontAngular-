import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiActionResponse } from '../../../infrastructure/providers/api-action.response';
import { SendReviewCommand } from '../commands/SendReviewCommand';
import { ConversationDeleteCommand } from '../commands/conversation-delete.command';
import { MarkAsReadConversationCommand } from '../commands/mark-as-read-conversation.command';
import { MarkAsReadMessageCommand } from '../commands/mark-as-read-message.command';
import { MarkAsUnreadConversationCommand } from '../commands/mark-as-unread-conversation.command';
import { MarkAsUnreadMessageCommand } from '../commands/mark-as-unread-message.command';
import { MessageProposalAcceptanceCommand } from '../commands/message-proposal-acceptance-command';
import { SendMessageWithProposalsCommand } from '../commands/send-message-poposals.command';
import { SendMessageCommand } from '../commands/send-message.command';
import { ParentProvider } from './../../../infrastructure/providers/parent.provider';

@Injectable({
    providedIn: 'root'
})
export class MessagingProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public deleteConversation(
        command: ConversationDeleteCommand
    ): Observable<ApiActionResponse> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.messaging.delete.deleteConversation
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodDelete),
            catchError(this.handleError)
        );
    }
    public updateProposal(
        command: MessageProposalAcceptanceCommand,
    ): Observable<ApiActionResponse> {
        return this.http.put<ApiActionResponse>(
            this.url(
                this.apiRoutes.messaging.put.updateProposal
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPut),
            catchError(this.handleError)
        );
    }
    public markAsReadConversation(
        command: MarkAsReadConversationCommand
    ): Observable<ApiActionResponse> {
        return this.http.put<ApiActionResponse>(
            this.url(
                this.apiRoutes.messaging.put.markAsReadConversation
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPut),
            catchError(this.handleError)
        );
    }

    public markAsUnreadConversation(
        command: MarkAsUnreadConversationCommand
    ): Observable<ApiActionResponse> {
        return this.http.put<ApiActionResponse>(
            this.url(
                this.apiRoutes.messaging.put.markAsUnreadConversation
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPut),
            catchError(this.handleError)
        );
    }
    public sendReview(
        command: SendReviewCommand
    ): Observable<ApiActionResponse> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.messaging.post.sendReview
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }
    public sendMessageWithProposals(
        command: SendMessageWithProposalsCommand
    ): Observable<ApiActionResponse> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.messaging.post.sendMessageWithProposals
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }
    public sendMessage(
        command: SendMessageCommand
    ): Observable<ApiActionResponse> {
        return this.http.post<ApiActionResponse>(
            this.url(
                this.apiRoutes.messaging.post.sendMessage
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPost),
            catchError(this.handleError)
        );
    }

    public markAsReadMessage(
        command: MarkAsReadMessageCommand
    ): Observable<ApiActionResponse> {
        return this.http.put<ApiActionResponse>(
            this.url(
                this.apiRoutes.messaging.put.markAsReadMessage
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPut),
            catchError(this.handleError)
        );
    }

    public markAsUnreadMessage(
        command: MarkAsUnreadMessageCommand
    ): Observable<ApiActionResponse> {
        return this.http.put<ApiActionResponse>(
            this.url(
                this.apiRoutes.messaging.put.markAsUnreadMessage
            ),
            command,
            this.httpOptions
        ).pipe(
            retry(this.retryMethodPut),
            catchError(this.handleError)
        );
    }
}
