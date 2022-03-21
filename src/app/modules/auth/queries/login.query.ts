export class LoginQuery {
    public readonly email: string;
    public readonly password: string;

    public constructor(
        email: string,
        password: string
    ) {
        this.email = email;
        this.password = password;
    }
}
