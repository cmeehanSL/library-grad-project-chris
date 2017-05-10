import { Component, OnInit }                            from '@angular/core';
import { FormGroup, FormBuilder, Validators }           from '@angular/forms';
import { trigger, state, style, animate, transition }   from '@angular/animations'

import { BookReservation } from '../shared/bookReservation';
import { LibraryService } from '../services/library.service';
import { IMyOptions } from 'mydatepicker';



@Component( {
    inputs: ['reserving', 'bookId'],
    selector: 'reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css'],
    animations: [
        trigger('dropInOut', [
            state('in', style({transform: 'translateY(0)'})),
            // transition('void => *', animate('100ms ease-in')),
            transition('void => *', [
              style({transform: 'translateY(-100%) scale(1)'}),
              animate('300ms ease-in')
            ]),
        ])
    ]
})
export class ReservationComponent implements OnInit {
    reserving: false;
    private reservationForm: FormGroup;

    // reservationLength: 0;
    private placeholder: string = 'Select a date';


    private bookId: number;

    private model: BookReservation;

    onSubmit() {
        this.model.Time = this.reservationForm.value.reservationDate.formatted;
        this.model.reservationLength = this.reservationForm.value.reservationLength;
        console.log(this.model);
    }


    numDaysRemaining = 5;
    daysArray = Array(14).fill(0);


    constructor(
        private fb: FormBuilder,
        private libraryService: LibraryService
    ) {}

    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd/mm/yyyy',
    };

    ngOnInit(): void {
        this.model = new BookReservation(this.bookId);
        this.buildForm();
    }

    buildForm(): void {
        this.reservationForm = this.fb.group( {
            'reservationDate': [null, Validators.required],
            'reservationLength': [null, Validators.required]
        });
        //
        // this.reservationForm.valueChanges
        // .subscribe(data => this.onValueChanged(data));
    }

    setDate(): void {
        // Set today date using the setValue fn
        let date = new Date();
        this.reservationForm.setValue({reservationDate: {
            date: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            }
        }});
    }

    // onBlur(): void {
    //     this.reserving = false;
    //     console.log("blurred");
    // }

    clearDate(): void {
        // Clear the date using the setValue fn
        this.reservationForm.setValue({myDate: null});
    }
}
