export class BookReservation {
    BookReservationId: number;
    Date: string;
    reservationLength: number;

    constructor(
        public BookId: number
    ){ }
}
