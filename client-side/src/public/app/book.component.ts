import { Component } from '@angular/core';
import { Book } from './book';
import { OnInit } from '@angular/core';
import { LibraryService } from './services/library.service'

@Component({
    selector: 'book-component',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
    constructor(private libraryService: LibraryService) {}
    title = 'book1';
    author = 'mr man';
    book: Book = {
        BookId: 1,
        Title: "he"
    };

    ngOnInit(): void {
        this.getBooks();
    }


    getBooks(): void {
        this.libraryService.getBooks().then(books => this.book = books[0]);
    }

}
