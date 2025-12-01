import { Injectable, ElementRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { AlertHelper } from '../helper/alert-helper';

@Injectable({
    providedIn: 'root',
})
export class FormValidationService {
    constructor(private alertHelper: AlertHelper) { }

    validateForm(
        formGroup: FormGroup,
        getReadableFieldName: (fieldName: string) => string,
        el: ElementRef
    ): boolean {
        if (formGroup.invalid) {
            this.markAllAsTouched(formGroup);
            this.showValidationErrors(formGroup, getReadableFieldName, el);
            return false;
        }
        return true;
    }

    private markAllAsTouched(formGroup: FormGroup | FormArray): void {
        Object.keys(formGroup.controls).forEach((key) => {
            const control = formGroup.get(key);
            if (control instanceof FormGroup || control instanceof FormArray) {
                this.markAllAsTouched(control);
            } else {
                control?.markAsTouched();
            }
        });
    }

    private showValidationErrors(
        formGroup: FormGroup,
        getReadableFieldName: (fieldName: string) => string,
        el: ElementRef
    ): void {
        const invalidFields: { fieldName: string; errors: string[] }[] = [];
        this.collectInvalidFieldsWithErrors(formGroup, invalidFields, getReadableFieldName);

        if (invalidFields.length > 0) {
            const firstInvalidControlKey = this.findFirstInvalidControlKey(formGroup);
            const error = invalidFields[0];
            let errorMessage = error.errors[0] + " : " + error.fieldName;

            if (error.errors[0] == 'Invalid value') {
                errorMessage = "This field is required : " + error.fieldName;
            }

            this.alertHelper
                .viewAlert('error', 'Form Invalid', errorMessage)
                .then(() => {
                    this.focusFirstInvalidControl(firstInvalidControlKey, el, formGroup);
                });
        }
    }

    private collectInvalidFieldsWithErrors(
        formGroup: FormGroup | FormArray,
        invalidFields: { fieldName: string; errors: string[] }[],
        getReadableFieldName: (fieldName: string) => string,
        parentKey = ''
    ): void {
        Object.keys(formGroup.controls).forEach((key) => {
            const control = formGroup.get(key);

            if (control instanceof FormGroup || control instanceof FormArray) {
                this.collectInvalidFieldsWithErrors(
                    control,
                    invalidFields,
                    getReadableFieldName,
                    parentKey ? `${parentKey}` : key
                );
            } else if (control?.invalid && control.errors) {
                const readableFieldName = getReadableFieldName(key);
                const errors = Object.keys(control.errors || {}).map((errorKey) =>
                    this.getErrorMessage(errorKey, control.errors![errorKey])
                );
                invalidFields.push({
                    fieldName: parentKey ? `${parentKey} : ${readableFieldName}` : readableFieldName,
                    errors,
                });
            }
        });
    }

    private findFirstInvalidControlKey(
        formGroup: FormGroup | FormArray,
        parentPath: string = ''
    ): string | null {
        for (const key of Object.keys(formGroup.controls)) {
            const control = formGroup.get(key);
            const fullPath = parentPath ? `${parentPath}.${key}` : key;

            if (control instanceof FormGroup || control instanceof FormArray) {
                const nested = this.findFirstInvalidControlKey(control, fullPath);
                if (nested) return nested;
            } else if (control?.invalid) {
                return fullPath;
            }
        }
        return null;
    }



    private focusFirstInvalidControl(controlKey: string | null, el: ElementRef, formGroup: FormGroup): void {
        if (!controlKey) return;

        const segments = controlKey.split('.');
        let selector = '';
        let currentElement = el.nativeElement;

        if (segments.length === 1) {
            // Simple control: e.g., escalationLevel
            selector = `[formControlName="${segments[0]}"]`;
        } else if (segments.length === 3) {
            const [formArrayName, index, formControlName] = segments;

            const formArray = formGroup.get(formArrayName);
            const isArray = formArray instanceof FormArray;

            if (isArray) {
                // Correct selector path for FormArray -> FormGroup -> FormControl
                selector = `[formArrayName="${formArrayName}"] [data-index="${index}"] [formControlName="${formControlName}"]`;
            } else {
                // Possibly a nested FormGroup
                selector = `[formGroupName="${formArrayName}"] [formGroupName="${index}"] [formControlName="${formControlName}"]`;
            }
        }

        const matchedElement = currentElement.querySelector(selector);
        currentElement = matchedElement;
        console.log('Selector:', selector);
        console.log('Found Element:', currentElement);
        // For ng-select, focus inside input
        if (currentElement?.classList.contains('ng-select')) {
            const input = currentElement.querySelector('input');
            if (input) currentElement = input;
        }

        if (currentElement) {
            currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => currentElement.focus(), 300);
        } else {
            console.warn(`Element not found for selector: ${selector}`);
        }
    }



    private collectInvalidFields(
        formGroup: FormGroup | FormArray,
        invalidFields: string[],
        getReadableFieldName: (fieldName: string) => string,
        parentKey = ''
    ): void {
        Object.keys(formGroup.controls).forEach((key) => {
            const control = formGroup.get(key);

            if (control instanceof FormGroup || control instanceof FormArray) {
                this.collectInvalidFields(
                    control,
                    invalidFields,
                    getReadableFieldName,
                    parentKey ? `${parentKey}` : key
                );
            } else if (control?.invalid) {
                const readableFieldName = getReadableFieldName(key);
                invalidFields.push(parentKey ? `${parentKey} : ${readableFieldName}` : readableFieldName);
            }
        });
    }

    public getErrorMessage(errorKey: string, errorValue: any): string {
        const errorMessages: { [key: string]: string } = {
            required: 'This field is required',
            minlength: `Minimum length should be ${errorValue.requiredLength}`,
            maxlength: `Maximum length should be ${errorValue.requiredLength}`,
            email: 'Enter a valid email address',
            pattern: 'Invalid format',
            // Additional validation error messages:
            min: `Value must be greater than or equal to ${errorValue.min}`,
            max: `Value must be less than or equal to ${errorValue.max}`,
            number: 'This field must be a valid number',
            equalTo: 'Fields must match',
            url: 'Enter a valid URL',
            date: 'Enter a valid date',
            digits: 'This field should only contain digits',
            custom: errorValue, // For custom errors with specific messages
            // Add other validation error messages as needed
        };

        return errorMessages[errorKey] || 'Invalid value';
    }

}
