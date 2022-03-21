import { environment } from 'src/environments/environment';

export class ForgottenPasswordCommand {
    public readonly email: string;
    public readonly fallbackUrl: string;

    public constructor(
        email: string
    ) {
        this.email = email;
        this.fallbackUrl = `${ environment.app.host }/#/reset-password`;
    }
}
