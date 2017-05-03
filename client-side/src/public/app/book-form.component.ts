import { Component } from '@angular/core';

import { Book } from './book';

@Component({
    selector: 'book-form',
    templateUrl: './book-form.component.html'
})
export class BookFormComponent {

    submitted = false;

    model = new Book('12442', 'The Talented Mr. Ripley',
                    'Patricia Highsmith', '1995');

    onSubmit() { this.submitted = true; }


}
