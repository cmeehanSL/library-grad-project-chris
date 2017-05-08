export class Book {
    BookId: number;
    // ISBN: string;
    // Title: string;
    // Author: string;
    // PublishDate: string;

    constructor(
        public ISBN: string,
        public Title: string,
        public Author: string,
        public PublishDate: string
    ){ }
}
