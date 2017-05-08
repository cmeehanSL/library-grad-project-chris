import { Component, HostBinding }   from '@angular/core';
import { Router }                   from '@angular/router';

@Component( {
    templateUrl: './reservation.component.html';
})
export class ReservationComponent {
    constructor(private router: Router) {}

    reservationLength: int;

    cancel() {
        this.closePopup();
    }

    closePopup() {
        this.router.navigate([{outlets: {popup: null}}]);
    }
}
