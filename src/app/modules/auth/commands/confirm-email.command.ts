export class ConfirmEmailCommand {
    public readonly email: string;
    public readonly token: string;

    public constructor(
        email: string,
        token: string
    ) {
        this.email = email;
        this.token = token;
    }
}
