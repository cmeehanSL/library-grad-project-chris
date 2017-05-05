import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Book } from './book';
import { LibraryService } from './services/library.service';
import { isbnValidator } from './shared/isbn-validator';


@Component({
    selector: 'book-form',
    templateUrl: './book-form.component.html'
})
export class BookFormComponent {
    constructor(
        private libraryService: LibraryService,
        private fb: FormBuilder
    ){}

    errorMessage: string;

    submitted = false;

    model = new Book('12442', 'The Talented Mr. Ripley',
                    'Patricia Highsmith', '1995');

    onSubmit() {
        this.submitted = true;
        this.model = this.bookForm.value;
    }



    bookForm: FormGroup;


    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.bookForm = this.fb.group( {
            'title': [this.model.Title, Validators.required ],
            'author': [this.model.Author, Validators.required],
            'isbn': [this.model.ISBN, [
                Validators.required,
                isbnValidator]
            ],
            'publishDate': [this.model.PublishDate, Validators.required]
        });

        this.bookForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }

    onConfirm() {
        this.libraryService.create(this.model)
                            .subscribe(
                                book    => console.log("added book " + book.Title),
                                error   => this.errorMessage = <any>error);

        this.submitted = true;
    }

    onValueChanged(data?: any) {
        if (!this.bookForm) { return; }
        const form = this.bookForm;

        for (const field in this.formErrors) {
            // clear any previous messages
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    private formErrors:  {[key: string]: any } = {
        'title': '',
        'author': '',
        'isbn': '',
        'publishDate': ''
    };

    private validationMessages: {[key: string]: any } = {
        'title': {
            'required': 'Title is required.'
        },
        'author': {
            'required': 'Author is required.'
        },
        'isbn': {
            'required': 'ISBN is required.',
            'invalidISBN': 'ISBN must be 10 or 13 digits'
        },
        'publishDate': {
            'required': 'Title is required.'
        }
    };



}
