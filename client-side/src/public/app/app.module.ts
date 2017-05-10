import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { RouterModule }             from '@angular/router';
import { HttpModule, JsonpModule }  from '@angular/http';
import { ReactiveFormsModule }      from '@angular/forms';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { DashboardComponent } from './dashboard.component';
import { ReservationComponent } from './reservation/reservation.component';
import { LibraryService } from './services/library.service';
import { Logger } from './services/logger.service';

import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        MyDatePickerModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {
                path: 'books',
                component: BookListComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'book-entry',
                component: BookFormComponent
            },
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        AppComponent,
        BookComponent,
        BookListComponent,
        DashboardComponent,
        BookFormComponent,
        ReservationComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        // BackendService,
        LibraryService,
        Logger
    ]
})
export class AppModule {}
