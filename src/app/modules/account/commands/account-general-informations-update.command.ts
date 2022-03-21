export class AccountGeneralInformationsUpdateCommand {
    public readonly id: string;
    public readonly email: string;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly birthDate: Date;
    public readonly presentation: string;

    public constructor(
        id: string,
        email: string,
        firstName: string,
        lastName: string,
        birthDate: Date,
        presentation: string
    )  {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.presentation = presentation;
    }
}
