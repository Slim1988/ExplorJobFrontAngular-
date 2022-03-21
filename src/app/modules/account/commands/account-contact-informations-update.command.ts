import { AccountAddressUpdateCommand } from './account-address-update.command';

export class AccountContactInformationsUpdateCommand {
    public readonly id: string;
    public readonly phone: string;
    public readonly address: AccountAddressUpdateCommand;
    public readonly contactMethodIds: Array<string>;

    public constructor(
        id: string,
        phone: string,
        address: AccountAddressUpdateCommand,
        contactMethodIds: Array<string>,
    )  {
        this.id = id;
        this.phone = phone;
        this.address = address;
        this.contactMethodIds = contactMethodIds;
    }
}
