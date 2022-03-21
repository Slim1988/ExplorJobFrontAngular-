import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ParentProvider } from '../../../infrastructure/providers/parent.provider';
import { UserContactInformation } from '../models/user-contact-information.model';
import { UserContactMethod } from '../models/user-contact-method.model';
import { UserDegree } from '../models/user-degree.model';
import { UserProfessionalSituation } from '../models/user-professional-situation.model';
import { UserPublic } from '../models/user-public.model';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersProvider extends ParentProvider {
    public constructor(
        private http: HttpClient
    ) {
        super();
    }

    public getAllDegrees(): Observable<Array<UserDegree>> {
        return this.http.get<Array<UserDegree>>(
            this.url(
                this.apiRoutes.users.get.allDegrees
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }

    public getAllContactInformations(): Observable<Array<UserContactInformation>> {
        return this.http.get<Array<UserContactInformation>>(
            this.url(
                this.apiRoutes.users.get.allContactInformations
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }

    public getAllContactMethods(): Observable<Array<UserContactMethod>> {
        return this.http.get<Array<UserContactMethod>>(
            this.url(
                this.apiRoutes.users.get.allContactMethods
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }

    public getAllProfessionalSituations(): Observable<Array<UserProfessionalSituation>> {
        return this.http.get<Array<UserProfessionalSituation>>(
            this.url(
                this.apiRoutes.users.get.allProfessionalSituations
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }

    public getPublicOneByUserId(
        userId: string
    ): Observable<UserPublic> {
        return this.http.get<UserPublic>(
            this.url(
                this.apiRoutes.users.get.publicOneByUserId,
                userId
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }

    public getOneByUserId(
        userId: string
    ): Observable<User> {
        return this.http.get<User>(
            this.url(
                this.apiRoutes.users.get.restrictedOneByUserId,
                userId
            ),
            this.httpOptions
        ).pipe(
            retry(this.retryMethodGet),
            catchError(this.handleError)
        );
    }
}
