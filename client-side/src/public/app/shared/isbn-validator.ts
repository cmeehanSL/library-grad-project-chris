// An ISBN number must be numerical and only contain 10 or 13 digits
import {AbstractControl} from '@angular/forms';
// @Directive( {
//     selector: '[isbnValidator]',
//     providers: [{provide: NG_VALIDATORS, useExisting: Forb}]
// })

export function isbnValidator (control: AbstractControl): {[key: string]: any} {
    const isbn = control.value.trim();

    let isValid = false;
    if(isbn.length == 10 || isbn.length == 13) {
        isValid = true;
    }

    return isValid ? null : {'invalidISBN': {isbn}};
}
