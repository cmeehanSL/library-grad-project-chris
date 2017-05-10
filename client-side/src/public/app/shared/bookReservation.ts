export class BookReservation {
    BookReservationId: number;
    Time: string;
    reservationLength: number;

    constructor(
        public BookId: number
    ){ }
}
