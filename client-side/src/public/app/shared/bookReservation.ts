import { IMyDate } from 'mydatepicker';

export class BookReservation {
    BookReservationId: number;
    Date: string;
    ReservationLength: number;
    ParsedDate: IMyDate;

    constructor(
        public BookId: number
    ){ }
}
