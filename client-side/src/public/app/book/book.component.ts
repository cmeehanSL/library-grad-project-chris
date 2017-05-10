import { Component } from '@angular/core';
import { trigger, state, style, animate, transition }   from '@angular/animations'

import { Book } from '../shared/book';
import { OnInit } from '@angular/core';
import { LibraryService } from '../services/library.service';

@Component({
    selector: 'book-component',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css'],
    inputs: ['book'],
    animations: [
        trigger('dropInOut', [
            state('active', style({height: '100px', transform: 'translateY(0)'})),
            state('inactive', style({transform: 'translateY(0)'})),
            transition('inactive => active', [
              style({height: '*'}),
              animate(300, style({height: '100px'}))
            ]),
        ])
    ]
})
export class BookComponent  {
    constructor(private libraryService: LibraryService) {}

    book: Book;
    title: string;
    reserving = false;
    state = 'inactive';

    private reservations: Date[] = [];

    reserve() {
        this.reserving = true;
        this.state = 'active';
    }

    cancel() {
        this.reserving = false;
        this.state = 'inactive';
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
