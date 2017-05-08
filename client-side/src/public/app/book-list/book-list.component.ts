import { Component }    from '@angular/core';
import { OnInit }       from '@angular/core';
import { Book } from '../shared/book';
import { LibraryService } from '../services/library.service';


@Component({
    selector: 'book-list-component',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

    errorMessage: string;
    books: Book[];

    constructor (private libraryService: LibraryService){}

    ngOnInit() {
        this.getBooks();
    }

    getBooks() {
        this.libraryService.getBooks()
                            .subscribe(
                                books => this.books = books,
                                error => this.errorMessage = <any>error);
    }
}
