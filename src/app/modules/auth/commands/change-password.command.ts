export class ChangePasswordCommand {
    public readonly email: string;
    public readonly currentPassword: string;
    public readonly newPassword: string;

    public constructor(
        email: string,
        currentPassword: string,
        newPassword: string
    ) {
        this.email = email;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}
