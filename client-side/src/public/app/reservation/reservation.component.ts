import { Component, EventEmitter, OnInit, Output }                            from '@angular/core';
import { FormGroup, FormBuilder, Validators }           from '@angular/forms';
import { trigger, state, style, animate, transition }   from '@angular/animations'

import { BookReservation } from '../shared/bookReservation';
import { LibraryService } from '../services/library.service';
import { IMyOptions, IMyDate, IMyDateModel, IMyDateRange } from 'mydatepicker';
var moment = require('moment');
var util = require('util');


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
    errorMessage: string;
    public MAX_DAYS: number = 14;

    @Output() reservingChange = new EventEmitter<boolean>();


    // ReservationLength: 0;
    private placeholder: string = 'Select a date';


    private bookId: number;

    private existingReservations: BookReservation[];
    private blockedDates: Array<IMyDateRange> = [];

    private model: BookReservation;

    onSubmit() {
        let formValue = this.reservationForm.value;
        this.model.Date = formValue.reservationDate.formatted;
        this.model.ReservationLength = formValue.ReservationLength;
        console.log(this.model);

        this.libraryService.reserve(this.model)
                            .subscribe(
                                reservation     => console.log("added reservation for book " + reservation.BookId),
                                error           => this.errorMessage = <any>error);

        this.reserving = false;
        this.reservingChange.emit(this.reserving);
    }

    selectedDate: IMyDate;
    numDaysRemaining: number;
    daysArray = Array(this.MAX_DAYS).fill(0);


    constructor(
        private fb: FormBuilder,
        private libraryService: LibraryService
    ) {}

    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd/mm/yyyy',
    };

    ngOnInit(): void {
        this.model = new BookReservation(this.bookId);
        this.getExistingReservations();
        this.buildForm();
    }

    buildForm(): void {
        console.log("building form and date pick options are " + util.inspect(this.myDatePickerOptions));

        this.reservationForm = this.fb.group( {
            'reservationDate': [null, Validators.required],
            'ReservationLength': [null, Validators.required]
        });



        // myDate
        //
        // this.reservationForm.valueChanges
        // .subscribe(data => this.onValueChanged(data));
    }

    getExistingReservations(): void {
        this.libraryService.getReservations(this.bookId)
                            .subscribe(
                                reservations    => {
                                    // console.log("existing reservations are " + util.inspect(reservations));
                                    this.existingReservations = reservations;
                                    this.parseDates();
                                    this.populateBlockedDates();
                                    this.buildForm();
                                },
                                error           => this.errorMessage = <any>error);
    }

    parseDates(): void {
        for(let i = 0; i < this.existingReservations.length; i++) {
            // console.log("this res is " + this.existingReservations[i]);
            // var formattedDate = moment(this.existingReservations[i].Date).format("DD/MM/YYYY");
            // console.log(formattedDate);
            var momentObj = moment(this.existingReservations[i].Date);
            this.existingReservations[i].ParsedDate = {
                year: momentObj.year(),
                month: momentObj.month() + 1,
                day: momentObj.date()
            };

            console.log(this.existingReservations[i].ParsedDate);

        }
    }

    populateBlockedDates(): void {
        for(let i = 0; i < this.existingReservations.length; i++) {
            let currentReservation = this.existingReservations[i];

            console.log("current res is  " + util.inspect(currentReservation));
            let numDays = currentReservation.ReservationLength;

            let startDay: IMyDate = currentReservation.ParsedDate;
            let endMomentObj = moment(currentReservation.Date).add(numDays, 'd');
            console.log("numDays is " + numDays);

            let endDay: IMyDate = {
                year: endMomentObj.year(),
                month: endMomentObj.month() + 1,
                day: endMomentObj.date()
            };

            let blockedRange: IMyDateRange = {
                begin: startDay,
                end: endDay
            };

            this.blockedDates.push(blockedRange);

            // for(let j = 0; j < currentReservation.ReservationLength; j++) {
            //     let blockedDay = currentReservation.ParsedDate;
            //     blockedDay.day += j;
            //     this.blockedDays.push(blockedDay);
            // }
        }

        console.log("blocked dates are" + util.inspect(this.blockedDates));

        this.myDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy',
            disableDateRanges: this.blockedDates,
        }
        // this.myDatePickerOptions.disableDateRanges = this.blockedDates;
        // this.myDatePickerOptions.disabled = true;
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

    onDateChanged(event: IMyDateModel): void {
        // this.selectedDate = event.date;
        console.log(event.date);
        let momentDate = moment().set({
            'year': event.date.year,
            'month': event.date.month,
            'date': event.date.day
        });

        // this.selectedDate = momentDate.format()
        let dateString = moment(momentDate).format();
        console.log(dateString);
        dateString = dateString.substring(0, dateString.indexOf('+'));

        console.log(dateString);

        for(let i = 0; i < this.MAX_DAYS; i++) {
            let currentDate = moment(momentDate).add(i, 'day');
            let currentDateString = currentDate.format();

            // is this string in the reserved list?
            var found = false;
            for(let i = 0; i < this.existingReservations.length; i++) {

            }

        }
    }


    clearDate(): void {
        // Clear the date using the setValue fn
        this.reservationForm.setValue({myDate: null});
    }
}
