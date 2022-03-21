export class FilterItem {
    public label: string;
    public value: string|null;

    public constructor(
        label: string|null
    ) {
        if (label === null) {
            this.label = '-Non renseigné';
            this.value = null;
        }
        else {
            this.label = label;
            this.value = label;
        }
    }
}
