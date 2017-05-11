import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Book } from '../shared/book';
import { BookReservation } from '../shared/bookReservation';
// import { BOOKS } from '../mock-books';
import { Logger } from './logger.service';
const util = require('util');


@Injectable()
export class LibraryService {
    private books: Book[] = [];
    private booksUrl = 'http://localhost:51918/api/books'; // URL to web API
    private reservationsUrl = 'http://localhost:51918/api/bookreservations'; // URL to web API
    private matchingReservationsUrl = 'http://localhost:51918/api/matchingreservations'; // URL to web API

    constructor(
        private http: Http,
        private logger: Logger
    ){ }

    // getBooks(): Promise<Book[]> {
    //     return Promise.resolve(BOOKS);
    // } // stub

    getBooks(): Observable<Book[]> {
        return this.http.get(this.booksUrl)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(util.inspect(res));
        console.log("body is " + util.inspect(body));
        return body || {};
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    create(newBook: Book): Observable<Book> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.booksUrl, newBook, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    reserve(newReservation: BookReservation): Observable<BookReservation> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.reservationsUrl, newReservation, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getReservations(bookId: number): Observable<BookReservation[]> {
        let targetUrl = this.matchingReservationsUrl + "/" + bookId

        return this.http.get(targetUrl)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
}
