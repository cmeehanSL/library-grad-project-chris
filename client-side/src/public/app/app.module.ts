import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { RouterModule }             from '@angular/router';
import { HttpModule, JsonpModule }  from '@angular/http';
import { FormsModule }              from '@angular/forms';

import { AppComponent } from './app.component';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list.component';
import { BookFormComponent } from './book-form.component';
import { DashboardComponent } from './dashboard.component';
// import { BackendService } from './services/backend.service';
import { LibraryService } from './services/library.service';
import { Logger } from './services/logger.service';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
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
        BookFormComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        // BackendService,
        LibraryService,
        Logger
    ]
})
export class AppModule {}
