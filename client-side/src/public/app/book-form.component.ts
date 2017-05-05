import { Component } from '@angular/core';

import { Book } from './book';
import { LibraryService } from './services/library.service';

@Component({
    selector: 'book-form',
    templateUrl: './book-form.component.html'
})
export class BookFormComponent {
    constructor(private libraryService: LibraryService){}
    errorMessage: string;

    submitted = false;

    model = new Book('12442', 'The Talented Mr. Ripley',
                    'Patricia Highsmith', '1995');

    onSubmit() { this.submitted = true; }

    onConfirm() {
        this.libraryService.create(this.model)
                            .subscribe(
                                book    => console.log("added book " + book.Title),
                                error   => this.errorMessage = <any>error);

        this.submitted = true;
    }


}
