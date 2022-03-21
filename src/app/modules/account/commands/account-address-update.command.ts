export class AccountAddressUpdateCommand {
    public readonly street: string;
    public readonly complement: string;
    public readonly zipCode: string;
    public readonly city: string;

    public constructor(
        street: string,
        complement: string,
        zipCode: string,
        city: string
    )  {
        this.street = street;
        this.complement = complement;
        this.zipCode = zipCode;
        this.city = city;
    }
}
