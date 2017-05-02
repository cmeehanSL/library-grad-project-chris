import { Component } from '@angular/core';

import '../assets/scss/styles.scss';
import '../assets/images/favicon.ico';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Library App';
}
