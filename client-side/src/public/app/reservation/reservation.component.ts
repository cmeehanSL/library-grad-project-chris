import { Component, OnInit }   from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LibraryService } from '../services/library.service';
import { IMyOptions } from 'mydatepicker';

@Component( {
    inputs: ['reserving'],
    selector: 'reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
    reserving: false;

    reservationLength: 0;

    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd.mm.yyyy',
    };

    private reservationForm: FormGroup;


    constructor(
        private fb: FormBuilder,
        private libraryService: LibraryService
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.reservationForm = this.fb.group( {
            reservationDate: [null, Validators.required]
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
