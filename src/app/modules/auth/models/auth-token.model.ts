import * as jwtDecode from 'jwt-decode';
import * as R from 'ramda';

export class AuthToken {
    public readonly accessToken: string;
    public readonly refreshToken: string;
    public readonly expiration: Date;

    public static decode(
        token: string
    ): any {
        return jwtDecode(
            token
        );
    }

    public static isAuthToken(
        object: any
    ): boolean {
        return !R.isNil(
            (object as AuthToken).accessToken
        ) && !R.isNil(
            (object as AuthToken).expiration
        );
    }
}
