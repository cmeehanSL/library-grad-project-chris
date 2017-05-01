import { Injectable } from '@angular/core';
import { Book } from '../book';
import { BOOKS } from '../mock-books';
import { Logger } from './logger.service';

@Injectable()
export class LibraryService {
    private books: Book[] = [];

    constructor(
        // private backend: BackendService,
        private logger: Logger
    ){ }

    getBooks(): Promise<Book[]> {
        return Promise.resolve(BOOKS);
    } // stub
    // getBooks() {
    //     this.backend.getAll(Book).then( (books: Book[]) => {
    //         this.logger.log(`Fetched ${books.length} books`);
    //         this.books.push(...books); // fill cache
    //     });
    //     return this.book;
    // }
}
