import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BookComponent } from './book.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
// import { BackendService } from './services/backend.service';
import { LibraryService } from './services/library.service';
import { Logger } from './services/logger.service';


@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppComponent, BookComponent],
    bootstrap: [AppComponent],
    providers: [
        // BackendService,
        LibraryService,
        Logger
    ]
})
export class AppModule {}
