import { AbstractControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'validationError',
    pure: false
})
export class ValidationErrorPipe implements PipeTransform {
    transform(control: AbstractControl, fieldName: string = 'Field', message?: string): any {
        
        // Custom Error messages
        // Required Error
        if (control.hasError('required')) {
            if(message) {
                return message;
            } else {
                return `${fieldName} is required.`;
            }
        }

        // Email Error
        if (control.hasError('email')) {
            return `${fieldName} is not valid.`;
        }

        // Min Length Error
        if (control.hasError('minlength')) {
            return `${fieldName} length must be at least ${control.getError('minlength').requiredLength}`;
        }

        // Max Length Error
        if (control.hasError('maxlength')) {
            return `${fieldName} length must be less than ${control.getError('maxlength').requiredLength}`;
        }

        //pattern Error
        if (control.hasError('pattern')) {
            return `${fieldName} is not valid.`;
        }
    }

}
