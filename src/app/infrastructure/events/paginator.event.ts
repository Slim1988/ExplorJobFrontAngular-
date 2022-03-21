export class PaginatorEvent {
    /**
     * Index of the first record
     */
    public first: number;

    /**
     * Number of rows to display in new page
     */
    public rows: number;

    /**
     * Index of the new page
     */
    public page: number;

    /**
     * Total number of pages
     */
    public pageCount: number;
}
