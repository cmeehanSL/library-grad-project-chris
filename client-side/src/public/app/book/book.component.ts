import { Component } from '@angular/core';
import { Book } from '../shared/book';
import { OnInit } from '@angular/core';
import { LibraryService } from '../services/library.service';

@Component({
    selector: 'book-component',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css'],
    inputs: ['book']
})
export class BookComponent  {
    constructor(private libraryService: LibraryService) {}

    book: Book;
    title: string;
    reserving = false;

    private reservations: Date[] = [];

    reserve() {
        this.reserving = true;
    }

    cancel() {
        this.reserving = false;
    }

    onBlur() {
        this.reserving = false;
        console.log("blur");
    }

    // book: Book = {
    //     BookId: 1,
    //     Title: "he"
    // };

    // ngOnInit(): void {
    //     this.getBooks();
    // }
    //
    //
    // getBooks(): void {
    //     this.libraryService.getBooks().then(books => this.book = books[0]);
    // }

}
