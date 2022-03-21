export class ResetPasswordCommand {
    public readonly email: string;
    public readonly token: string;
    public readonly newPassword: string;

    public constructor(
        email: string,
        token: string,
        newPassword: string
    ) {
        this.email = email;
        this.token = token;
        this.newPassword = newPassword;
    }
}
