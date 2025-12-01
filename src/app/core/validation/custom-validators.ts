import {
  FormGroup,
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AlertHelper } from 'src/app/core/helper/alert-helper';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Ensures it's available app-wide
})
export class CustomValidators {
  alertHelper = new AlertHelper();
  /* Description : allow only nmbers between 0-9 */
  keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      return false;
    } else {
      return true;
    }
  }

  acceptAlphabetWithBlockFirstSpace(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    // Block space as the first character
    if (inputElement.value.startsWith(' ')) {
      inputElement.value = inputElement.value.trimStart(); // Remove leading spaces
      return;
    }

    // Allow alphabets and spaces, but block any other characters
    inputElement.value = inputElement.value.replace(/[^a-zA-Z ]/g, '');
  }

  //isvalidPin ^[1-9][0-9]{5}$
  isValidPin(event: any) {
    let pattern = new RegExp(/^[1-9][0-9]{5}$/);
    let elmVal = event.target.value;
    if (elmVal !== '') {
      if (pattern.test(elmVal)) {
        return true;
      } else {
        this.alertHelper.viewAlert(
          'error',
          'Invalid',
          'Please enter valid pin code'
        );
        event.target.value = '';
        return false;
      }
    }
    return true;
  }

  checkCharecterWithLength(event: any, charCountId: string): void {
    const charCountEle = document.getElementById(charCountId) as HTMLElement;
    const inputEle = event.target as HTMLTextAreaElement;
    let remarksValue = inputEle.value;
    remarksValue = remarksValue.replace(/[^a-zA-Z0-9 ]/g, '');
    remarksValue = remarksValue.trimStart().replace(/\s{2,}/g, ' ');
    inputEle.value = remarksValue;
    const remainingChars = 200 - remarksValue.length;
    charCountEle.textContent = remainingChars.toString();
    if (remainingChars < 0) {
      inputEle.value = remarksValue.substring(0, 200);
      charCountEle.textContent = '0';
    }
  }
  checkCharecterWithLengthfive(event: any, charCountId: string): void {
    const charCountEle = document.getElementById(charCountId) as HTMLElement;
    const inputEle = event.target as HTMLTextAreaElement;
    let remarksValue = inputEle.value;
    remarksValue = remarksValue.replace(/[^a-zA-Z0-9 ]/g, '');
    remarksValue = remarksValue.trimStart().replace(/\s{2,}/g, ' ');
    inputEle.value = remarksValue;
    const remainingChars = 500 - remarksValue.length;
    charCountEle.textContent = remainingChars.toString();
    if (remainingChars < 0) {
      inputEle.value = remarksValue.substring(0, 500);
      charCountEle.textContent = '0';
    }
  }
  mobileNoValidation(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
    if (inputElement.value.length > 10) {
      inputElement.value = inputElement.value.substring(0, 10);
    }
    if (inputElement.value.length > 0 && +inputElement.value[0] < 6) {
      inputElement.value = ''; // Clear the input if invalid
    }
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  aToEValidation(event: any) {
    //allow only A to E or a to e
    var charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 69) && (charCode < 97 || charCode > 101)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  blockSpecialCharactersInFirstPosition(event: any) {
    // Get the value of the input field
    const inputValue: string = (event.target as HTMLInputElement).value;

    // Get the pressed character
    const charCode = event.which || event.keyCode;
    const charTyped = String.fromCharCode(charCode);

    // Check if the pressed character is a special character
    const isSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      charTyped
    );

    // If it's the first character and it's a special character, prevent the default behavior
    if (inputValue.length === 0 && isSpecialCharacter) {
      this.alertHelper.viewAlert(
        'error',
        'Invalid',
        'Special character not allowed as first character.'
      );
      event.preventDefault();
    }
  }

  keyPressAlphabetSpaceDot(event: any) {
    //alert('hello');
    if (
      (event.key === '.' || event.key === ' ') &&
      event.target.value.length === 0
    ) {
      this.alertHelper.viewAlert(
        'error',
        'Invalid',
        'Space/dot not allowed as first character.'
      );
      event.preventDefault();
    }
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 123) &&
      charCode != 32 &&
      charCode != 46
    ) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  keyPressAlphabetSpaceDotDigit(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (
      (charCode < 48 || charCode > 57) &&
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 123) &&
      charCode != 32 &&
      charCode != 46
    ) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  camelToTitleCase(txtString: any) {
    const result = txtString.replace(/([A-Z])/g, ' $1');
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }

  camelToSentenceCase(txtString: any) {
    return txtString
      .split(/([A-Z]|\d)/)
      .map((v: any, i: any, arr: any) => {
        // If first block then capitalise 1st letter regardless
        if (!i) return v.charAt(0).toUpperCase() + v.slice(1);
        // Skip empty blocks
        if (!v) return v;
        // Underscore substitution
        if (v === '_') return ' ';
        // We have a capital or number
        if (v.length === 1 && v === v.toUpperCase()) {
          const previousCapital = !arr[i - 1] || arr[i - 1] === '_';
          const nextWord =
            i + 1 < arr.length && arr[i + 1] && arr[i + 1] !== '_';
          const nextTwoCapitalsOrEndOfString =
            i + 3 > arr.length || (!arr[i + 1] && !arr[i + 3]);
          // Insert space
          if (!previousCapital || nextWord) v = ' ' + v;
          // Start of word or single letter word
          if (nextWord || (!previousCapital && !nextTwoCapitalsOrEndOfString))
            v = v.toLowerCase();
        }
        return v;
      })
      .join('');
  }

  /*  Created On : 19-05-2022  || Description : allow only numbers  */
  onlyNumber(event: any) {
    event = event ? event : window.event;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      return false;
    }
    return true;
  }

  /*  Created On : 25-05-2022  || Description : Allow Only Numbers with Decimals  */
  keyPressNumbersDecimal(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    const inputValue: string = event.target.value;
    const cursorPosition = event.target.selectionStart;

    // Allow control keys (Backspace, Delete, arrows, etc.)
    if (
      event.ctrlKey ||
      event.metaKey ||
      charCode === 8 ||
      charCode === 37 ||
      charCode === 39 ||
      charCode === 46
    ) {
      return true;
    }

    // Allow only digits and one decimal point
    if (!charStr.match(/[0-9.]/)) {
      event.preventDefault();
      return false;
    }

    // Prevent more than one dot
    if (charStr === '.' && inputValue.includes('.')) {
      event.preventDefault();
      return false;
    }

    // Restrict to two digits after decimal
    const [integerPart, decimalPart] = inputValue.split('.');
    if (
      decimalPart &&
      inputValue.includes('.') &&
      cursorPosition > inputValue.indexOf('.')
    ) {
      if (decimalPart.length >= 2) {
        event.preventDefault();
        return false;
      }
    }

    return true;
  }

  /*  Created On : 25-05-2022  || Description : Allow Only Numbers with Hypen  */
  keyPressDate(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode != 45 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  /*  Created On : 25-05-2022  || Description : Allow Only Numbers with Decimals and - */
  keyPressLatLong(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (
      charCode != 45 &&
      charCode != 46 &&
      charCode > 31 &&
      (charCode < 48 || charCode > 57)
    ) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  /*  Created On : 25-05-2022  || Description : Allow Only Numbers with Decimals and - */
  keyPressLandline(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (
      charCode != 45 &&
      charCode != 40 &&
      charCode != 41 &&
      charCode > 31 &&
      (charCode < 48 || charCode > 57)
    ) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  /*  Created On : 31-05-2022  || Description : Aadhaar Validation (Verhoff)  */
  // validates Aadhaar number received as string
  validateAadhar(aadharNumber: any) {
    // Aadhaar must be 12 digits and should not start with 0 or 1
    if (!/^[2-9][0-9]{11}$/.test(aadharNumber)) {
      return false;
    }
    const d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];

    // permutation table
    const p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];
    let c = 0;
    let invertedArray = aadharNumber.split('').map(Number).reverse();

    invertedArray.forEach((val: any, i: any) => {
      c = d[c][p[i % 8][val]];
    });

    return c === 0;
  }

  /*  Created On : 31-05-2022  || Description : Check File type  */
  checkFileType(control: AbstractControl): { [key: string]: any } | null {
    let filename = control.value;
    var ext = filename.substring(filename.lastIndexOf('.') + 1);
    let forbidden = true;
    if (ext === 'pdf') {
      forbidden = false;
    }
    return forbidden ? { invalid_type: true } : null;
  }

  /*  Created On : 31-05-2022  || Description : Check File Size Validation  */
  fileSizeValidator(files: FileList, size: any) {
    return function (control: FormControl) {
      // return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      if (file) {
        var path = file.replace(/^.*[\\\/]/, '');
        const fileSize = files[0].size;
        const fileSizeInKB = Math.round(fileSize / 1024);
        if (fileSizeInKB > size) {
          return {
            fileSizeValidator: true,
          };
        } else {
          return null;
        }
      }
      return null;
    };
  }

  /*  Created On : 31-05-2022  || Description : Check File Type Validation  */
  requiredFileType(type: string[]) {
    return function (control: FormControl) {
      // return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      var existValue: boolean = false;
      if (file) {
        var path = file.replace(/^.*[\\\/]/, '');

        const extension = path.split('.')[1].toUpperCase();
        for (var i = 0; i < type.length; i++) {
          let typeFile = type[i].toUpperCase();
          if (typeFile === extension.toUpperCase()) {
            existValue = true;
          }
        }
        if (existValue == true) {
          return null;
        } else {
          return {
            requiredFileType: true,
          };
        }
      }
      return null;
    };
  }
  /*  Created On : 16-05-2022  || Description : allow only alphabets between a-z or A-Z  */
  onlyAlphabets(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9 and space
    if (charCode === 32) return true;
    if (charCode < 65 || charCode > 122 || (charCode > 90 && charCode < 97))
      return false;
    return true;
  }
  /*  Created On : 16-05-2022  || Description : allow only alphabets between a-z or A-Z  */
  onlyNumbersWithDecimal(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode === 46) return true;
    if (charCode < 48 || charCode > 57) return false;
    return true;
  }
  /*  Created On : 06-06-2022  || Description : Check for special characters  */
  checkSpecialChar(event: any): boolean {
    const charCode = event?.which ? event?.keyCode : event?.which;
    return (
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      charCode == 8 ||
      charCode == 32 ||
      (charCode >= 48 && charCode <= 57)
    );
  }
  /*  Created On : 06-06-2022  || Description : Check word start with white space */
  firstCharValidator(event: any) {
    const validatorArr = [
      event.target.value.startsWith(' '),
      event.target.value.startsWith('.'),
    ];

    if (validatorArr.includes(true)) {
      this.alertHelper.viewAlert(
        'error',
        'Invalid',
        'Space/dot not allowed as first character.'
      );
    }
  }

  /*  Created On : 06-06-2022  || Description : Check alphabet with comma */
  alphabetWithComma(event: any) {
    const charCode = event?.which ? event?.keyCode : event?.which;
    if (charCode === 44) return true;
    if (charCode < 65 || charCode > 122 || (charCode > 90 && charCode < 97))
      return false;
    return true;
  }
  /*  Created On : 06-06-2022  || Description : Check alphabet with comma and space */
  alphaNumericWithCommaSpace(event: any) {
    const charCode = event?.which ? event?.keyCode : event?.which;
    if (charCode === 44 || charCode === 32) return true;
    if (charCode >= 48 && charCode <= 57) return true;
    if (charCode < 65 || charCode > 122 || (charCode > 90 && charCode < 97))
      return false;
    return true;
  }

  /*  Created On : 06-06-2022  || Description : Check alphabet with hypen and slash */
  alphaNumericWithHypenSlash(event: any) {
    if (
      (event.key === '/' || event.key === '-') &&
      event.target.value.length === 0
    ) {
      this.alertHelper.viewAlert(
        'error',
        'Invalid',
        'Special characters not allowed as first character.'
      );
      event.preventDefault();
    }

    const inputValue = event.key;
    // Regular expression to match alphanumeric characters, hyphens, and slashes
    const pattern = /^[a-zA-Z0-9\-\/]*$/;
    if (!pattern.test(inputValue)) {
      // Prevent the default action (typing the character) if it doesn't match the pattern
      event.preventDefault();
    }
  }

  /*  Created On : 06-06-2022  || Description : customizable alphanumeric validator */
  alphaNumericValidator(event: any, ...types: any) {
    const charCode = event.which ? event.keyCode : event.which;

    // allow comma
    if (types.includes('comma') && charCode === 44) return true;
    if (types.includes('plus') && charCode === 43) return true;
    if (types.includes('space') && charCode === 32) return true;
    if (types.includes('dot') && charCode === 46) return true;
    if (types.includes('hyphen') && charCode === 45) return true;
    if (types.includes('slash') && charCode === 47) return true;
    if (types.includes('singleQuote') && charCode === 39) return true;
    if (types.includes('leftParaanthesis') && charCode === 40) return true;
    if (types.includes('rightParaanthesis') && charCode === 41) return true;
    // ==== default condition for alphabets and numbers

    if (charCode >= 48 && charCode <= 57) return true;
    if (charCode >= 65 && charCode <= 90) return true;
    if (charCode >= 97 && charCode <= 122) return true;
    //end
    return false;
  }

  // ================================= Reactive form Validations

  /*  Created On : 16-05-2022  || Description : Central client side validator  */
  formValidationHandler(
    formGroup: FormGroup,
    labels: string[],
    elementRef: any = undefined,
    customMessage: any = undefined
  ): any {
    if (formGroup.invalid === true) {
      let i = 0;
      for (let iterator in formGroup.controls) {
        // focus
        if (formGroup.controls[iterator]?.invalid) {
          elementRef?.nativeElement
            .querySelector('[formControlName="' + iterator + '"]')
            ?.focus();
        } // end

        if (formGroup.controls[iterator].errors?.['required'] === true) {
          let message = '';
          // custom message
          if (
            customMessage !== undefined &&
            customMessage?.required?.[iterator]
          ) {
            message = customMessage?.required?.[iterator];
          } else {
            message = `${labels[i]} is required!`; // default message
          }
          this.alertHelper.viewAlert('error', 'Invalid', message);
          return [labels[i], true];
        }

        if (formGroup.controls[iterator].errors?.['email'] === true) {
          this.alertHelper.viewAlert(
            'error',
            'Invalid',
            `Invalid mail id for ${labels[i].toLowerCase()}`
          );
          return [labels[i], true];
        }

        // ===== conditional required validation
        if (
          formGroup.controls[iterator].errors?.['conditionalValidation']
            ?.required === true
        ) {
          let message = '';
          // custom message
          if (
            customMessage !== undefined &&
            customMessage?.conditionalValidation?.[iterator]
          )
            message = customMessage?.conditionalValidation?.[iterator];
          else message = `${labels[i]} is required!`; // default message

          this.alertHelper.viewAlert('warning', 'INVALID', message);
          return [labels[i], true];
        }
        if (formGroup.controls[iterator].errors?.['maxlength'] !== undefined) {
          const { actualLength, requiredLength } =
            formGroup.controls[iterator].errors?.['maxlength'];
          if (actualLength !== requiredLength) {
            this.alertHelper.viewAlert(
              'error',
              'Invalid',
              `${labels[i]} length should be maximum ${requiredLength} characters.`
            );
          }

          return [labels[i], true];
        }
        if (formGroup.controls[iterator].errors?.['minlength'] !== undefined) {
          const { actualLength, requiredLength } =
            formGroup.controls[iterator].errors?.['minlength'];
          if (actualLength !== requiredLength) {
            this.alertHelper.viewAlert(
              'error',
              'Invalid',
              `${labels[i]} length should be minimum ${requiredLength} characters.`
            );
          }

          return [labels[i], true];
        }

        if (formGroup.controls[iterator].errors?.['max'] !== undefined) {
          const { actual, max } = formGroup.controls[iterator].errors?.['max'];
          if (actual !== max) {
            this.alertHelper.viewAlert(
              'error',
              'Invalid',
              `${labels[i]} should be maximum ${max}.`
            );
          }
          return [labels[i], true];
        }

        if (formGroup.controls[iterator].errors?.['min'] !== undefined) {
          // console.log(formGroup.controls[iterator].errors?.["min"]);
          let tmpMsg: any = '';
          const { actual, min } = formGroup.controls[iterator].errors?.['min'];
          if (actual !== min) {
            this.alertHelper.viewAlert(
              'error',
              'Invalid',
              `${labels[i]} should be minimum ${min}`
            );
          }
          if (actual !== min) {
            if (min > 1) {
              tmpMsg = `${labels[i]} should be minimum ${min}`;
            } else {
              tmpMsg = `${labels[i]} should not be zero`;
            }
            this.alertHelper.viewAlert('warning', 'INVALID', tmpMsg);
          }
          return [labels[i], true];
        }

        if (formGroup.controls[iterator].errors?.['pattern'] !== undefined) {
          this.alertHelper.viewAlert(
            'error',
            'Invalid',
            `Invalid input for ${labels[i]?.toLowerCase()}`
          );

          return [labels[i], true];
        }
        if (
          formGroup.controls[iterator].errors?.['firstCharValidatorRF'] !==
          undefined
        ) {
          this.alertHelper.viewAlert(
            'error',
            'Invalid',
            `Space/dot not allowed as first character in ${labels[
              i
            ].toLowerCase()} `
          );

          return [labels[i], true];
        }
        i++;
      }
    }
    return false;
  }

  /*  Created On : 20-05-2022  || Description : custom client side form validator  */
  customFormValidationHandler(formGroup: FormGroup): any {
    if (formGroup.invalid === true) {
      let i = 0;
      for (const iterator in formGroup.controls) {
        // console.log(formGroup.controls[iterator].errors?.["max"]);
        if (formGroup.controls[iterator].errors?.['required'] === true) {
          //formGroup.controls[iterator].focus();
          this.alertHelper.viewAlert(
            'error',
            'Invalid',
            `${this.camelToSentenceCase(iterator)} can not be left blank`
          );
          return [this.camelToSentenceCase(iterator), true];
        }

        // ===== conditional required validation
        if (
          formGroup.controls[iterator].errors?.['conditionalValidation']
            ?.required === true
        ) {
          this.alertHelper.viewAlert(
            'error',
            'Invalid',
            `${this.camelToSentenceCase(iterator)} can not be left blank`
          );

          return [this.camelToSentenceCase(iterator), true];
        }

        if (formGroup.controls[iterator].errors?.['max'] !== undefined) {
          const { actual, max } = formGroup.controls[iterator].errors?.['max'];
          if (actual !== max) {
            this.alertHelper.viewAlert(
              'error',
              'Invalid',
              `${this.camelToSentenceCase(iterator)} should be maximum ${max}.`
            );
          }
          return [this.camelToSentenceCase(iterator), true];
        }

        if (formGroup.controls[iterator].errors?.['min'] !== undefined) {
          //console.log(formGroup.controls[iterator].errors?.["min"]);
          let tmpMsg: any = '';
          const { actual, min } = formGroup.controls[iterator].errors?.['min'];
          if (actual !== min) {
            if (min > 1) {
              tmpMsg = `${this.camelToSentenceCase(
                iterator
              )} should be minimum ${min}`;
            } else {
              tmpMsg = `${this.camelToSentenceCase(
                iterator
              )} should not be zero`;
            }
            this.alertHelper.viewAlert('error', 'Invalid', tmpMsg);
          }
          return [this.camelToSentenceCase(iterator), true];
        }

        if (formGroup.controls[iterator].errors?.['maxlength'] !== undefined) {
          const { actualLength, requiredLength } =
            formGroup.controls[iterator].errors?.['maxlength'];
          if (actualLength !== requiredLength) {
            this.alertHelper.viewAlert(
              'error',
              'Invalid',
              `${this.camelToSentenceCase(
                iterator
              )} length should be maximum ${requiredLength} characters.`
            );
          }
          return [this.camelToSentenceCase(iterator), true];
        }

        if (formGroup.controls[iterator].errors?.['minlength'] !== undefined) {
          const { actualLength, requiredLength } =
            formGroup.controls[iterator].errors?.['minlength'];
          if (actualLength !== requiredLength) {
            this.alertHelper.viewAlert(
              'error',
              'Invalid',
              `${this.camelToSentenceCase(
                iterator
              )} length should be minimum ${requiredLength} characters.`
            );
          }
          return [this.camelToSentenceCase(iterator), true];
        }

        if (formGroup.controls[iterator].errors?.['email'] === true) {
          this.alertHelper.viewAlert(
            'error',
            'Invalid',
            `Invalid mail id for ${this.camelToSentenceCase(iterator)}`
          );
          return [this.camelToSentenceCase(iterator), true];
        }

        if (
          formGroup.controls[iterator].errors?.['firstCharValidatorRF'] !==
          undefined
        ) {
          this.alertHelper.viewAlert(
            'error',
            'Invalid',
            `Space/dot not allowed as first character in ${this.camelToSentenceCase(
              iterator
            )} `
          );
          return [this.camelToSentenceCase(iterator), true];
        }

        if (formGroup.controls[iterator].errors?.['pattern'] !== undefined) {
          this.alertHelper.viewAlert(
            'error',
            'Invalid',
            `Invalid input for ${this.camelToSentenceCase(iterator)}`
          );
          return [this.camelToSentenceCase(iterator), true];
        }

        if (formGroup.controls[iterator].errors?.['ageRange'] !== undefined) {
          this.alertHelper.viewAlert(
            'error',
            'Invalid',
            `Please enter a valid date for ${this.camelToSentenceCase(
              iterator
            )} `
          );
          return [this.camelToSentenceCase(iterator), true];
        }

        i++;
      }
    }
    return false;
  }

  /*  Created On : 25-08-2022  || Description : validate min and max age   */
  ageRangeValidator(min: number, max: number = 100): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (
        control.value !== undefined &&
        (isNaN(control.value) || control.value < min || control.value > max)
      ) {
        return { ageRange: true };
      }
      return null;
    };
  }

  formArrayValidationHandler(formGroup: FormGroup, labels: string[]): any {
    let allErrors: any = [];
    if (formGroup.invalid === true) {
      let i = 0;
      for (let iterator in formGroup.controls) {
        if (formGroup.controls[iterator].status === 'INVALID') {
          if (formGroup.controls[iterator].errors?.['required'] === true) {
            let msg = `${labels[i]} required`;
            // console.log(msg);
            allErrors.push(msg);
          }

          if (formGroup.controls[iterator].errors?.['email'] === true) {
            let msg = `Invalid mail id for ${labels[i]}`;
            allErrors.push(msg);
          }

          // ===== conditional required validation
          if (
            formGroup.controls[iterator].errors?.['conditionalValidation']
              ?.required === true
          ) {
            let msg = `${labels[i]} required`;
            allErrors.push(msg);
          }

          if (
            formGroup.controls[iterator].errors?.['maxlength'] !== undefined
          ) {
            const { actualLength, requiredLength } =
              formGroup.controls[iterator].errors?.['maxlength'];
            if (actualLength !== requiredLength) {
              let msg = `${labels[i]} length should be maximum ${requiredLength} characters.`;
              allErrors.push(msg);
            }
          }

          if (
            formGroup.controls[iterator].errors?.['minlength'] !== undefined
          ) {
            const { actualLength, requiredLength } =
              formGroup.controls[iterator].errors?.['minlength'];
            if (actualLength !== requiredLength) {
              let msg = `${labels[i]} length should be minimum ${requiredLength} characters.`;
              allErrors.push(msg);
            }
          }

          if (formGroup.controls[iterator].errors?.['max'] !== undefined) {
            const { actual, max } =
              formGroup.controls[iterator].errors?.['max'];
            if (actual !== max) {
              let msg = `${labels[i]} should be maximum ${max}.`;
              allErrors.push(msg);
            }
          }

          if (formGroup.controls[iterator].errors?.['min'] !== undefined) {
            // console.log(formGroup.controls[iterator].errors?.["min"]);
            let tmpMsg: any = '';
            const { actual, min } =
              formGroup.controls[iterator].errors?.['min'];
            if (actual !== min) {
              let msg = `${labels[i]} should be minimum ${min}`;
              allErrors.push(msg);
            }
            if (actual !== min) {
              if (min > 1) {
                tmpMsg = `${labels[i]} should be minimum ${min}`;
              } else {
                tmpMsg = `${labels[i]} should not be zero`;
              }
              allErrors.push(tmpMsg);
            }
          }

          if (formGroup.controls[iterator].errors?.['pattern'] !== undefined) {
            let msg = `Invalid input for ${labels[i]}`;
            allErrors.push(msg);
          }

          if (
            formGroup.controls[iterator].errors?.['firstCharValidatorRF'] !==
            undefined
          ) {
            let msg = `Space/dot not allowed as first character in ${labels[i]} `;
            allErrors.push(msg);
          }
        }

        i++;
      }
    }
    return allErrors;
  }

  firstCharValidatorRF(control: AbstractControl): ValidationErrors | null {
    // 1) if input is number type
    if (
      typeof control.value === 'number' &&
      control.value.toString().indexOf(' ') == 0
    ) {
      return { firstCharValidatorRF: true };
    }
    // 2) if input is string type
    if (
      typeof control.value === 'string' &&
      (control.value as string).indexOf(' ') == 0
    ) {
      return { firstCharValidatorRF: true };
    }
    if (
      typeof control.value === 'string' &&
      (control.value as string).indexOf('.') == 0
    ) {
      return { firstCharValidatorRF: true };
    }

    return null;
  }

  keyPressDotSlashComma(event: any) {
    var regex = new RegExp('^[a-zA-Z0-9, ./-]+$');
    var key = String.fromCharCode(
      !event.charCode ? event.which : event.charCode
    );
    if (!regex.test(key)) {
      event.preventDefault();
      //  return false;
    }
  }

  keyPressAlphSlashUnderscore(event: any) {
    var regex = new RegExp('^[a-zA-Z /_]+$');
    var key = String.fromCharCode(
      !event.charCode ? event.which : event.charCode
    );
    if (!regex.test(key)) {
      event.preventDefault();
      //  return false;
    }
  }

  /*  Created On : 06-06-2022  || Description : customizable alphanumeric validator */
  eyeCheckupParameterValidator(event: any, ...types: any) {
    const charCode = event.which ? event.keyCode : event.which;
    if (types.includes('dot') && charCode === 46) return true;
    if (types.includes('hyphen') && charCode === 45) return true;
    if (types.includes('plus') && charCode === 43) return true;
    if (types.includes('slash') && charCode === 47) return true;
    // ==== default condition for alphabets and numbers
    if (charCode >= 48 && charCode <= 57) return true;
    //end
    return false;
  }

  keyPressAlphabetSpaceDotBracketHiphenSlash(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 123) &&
      charCode != 32 &&
      charCode != 46 &&
      charCode != 40 &&
      charCode != 41 &&
      charCode != 45 &&
      charCode != 47 &&
      charCode != 44
    ) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onKeyDownOrRightClick(event: KeyboardEvent | MouseEvent): void {
    // Check if it's a paste (Ctrl+V or Command+V) or right-click
    if (
      (event instanceof KeyboardEvent &&
        (event.ctrlKey || event.metaKey) &&
        (event.key === 'v' || event.key === 'V')) ||
      (event instanceof MouseEvent && event.button === 2) // 2 represents the right mouse button
    ) {
      // Prevent the default behavior for paste or right-click
      event.preventDefault();
    }
  }

  onContextMenu(event: MouseEvent): void {
    // Prevent the default context menu behavior (right-click)
    event.preventDefault();
  }

  checkVal(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      return false;
    }

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var year = event.target.value;
    if (year < 1800 || year > currentYear) {
      this.alertHelper.viewAlert(
        'error',
        '',
        'Year of Establishment must be greater than 1800 and less than or equal to current year'
      );
      return;
    } else {
      return true;
    }
  }

  /*  Created On : 08-08-2024  || Description : Check alphabet with comma and space */
  keyPressAlphaNumericWithCommaSpaceDot(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    const value = event.target.value;

    // Prevent space, dot, or number as the first character
    if (value.length === 0) {
      if (
        event.key === ' ' ||
        event.key === '.' ||
        event.key === '-' ||
        (charCode >= 48 && charCode <= 57)
      ) {
        this.alertHelper.viewAlert(
          'error',
          'Invalid',
          'First character must be an alphabet and not a space, dot, or number.'
        );
        event.preventDefault();
        return false;
      }
    }

    // Allow alphabetic characters (A-Z, a-z)
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)
    ) {
      return true;
    }

    // Allow numeric characters (0-9), space, and dot after the first character
    if (
      value.length > 0 &&
      ((charCode >= 48 && charCode <= 57) ||
        charCode === 32 ||
        charCode === 46 ||
        event.key === '-' ||
        event.key === ',')
    ) {
      return true;
    }

    // Prevent any other characters
    event.preventDefault();
    return false;
  }

  preventTyping(event: KeyboardEvent): void {
    event.preventDefault();
  }

  alphaNumericWithUnderscore(event: any) {
    const charCode = event?.which ? event?.keyCode : event?.which;
    // Allow underscore (_)
    if (charCode === 95) return true;
    // Allow numbers (0-9)
    if (charCode >= 48 && charCode <= 57) return true;
    // Allow letters (a-z, A-Z)
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)
    )
      return true;
    return false;
  }
  isValidMarksWithDot(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    const inputValue = event.target.value;

    // Allow navigation keys (Backspace, Delete, Arrow keys)
    const allowedKeys = [8, 9, 37, 39, 46];
    if (allowedKeys.includes(charCode)) return true;

    // Allow only one dot (.)
    if (charCode === 46) {
      if (inputValue.includes('.')) return false; // Prevent multiple dots
      return true;
    }

    // Allow only numbers (0-9)
    if (charCode < 48 || charCode > 57) return false;

    // Prevent input of 100 or greater
    const newValue = inputValue + String.fromCharCode(charCode);
    if (parseFloat(newValue) >= 100) return false; // Changed condition to prevent 100

    return true;
  }

  preventCopyPasteDragDrop(event: Event): void {
    event.preventDefault();
  }

  keyPressAlphabetSpacePrevent(event: any) {
    const inputValue = event.target.value;
    const key = event.key;

    // Prevent first char as space or dot
    if ((key === ' ' || key === '.') && inputValue.length === 0) {
      this.alertHelper.viewAlert(
        'error',
        'Invalid',
        'Space not allowed at the beginning.'
      );
      event.preventDefault();
      return false;
    }

    const charCode = event.which ? event.which : event.keyCode;

    // Allow A-Z, a-z, space (32), dot (46)
    const isLetter =
      (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
    const isSpace = charCode === 32;

    if (!(isLetter || isSpace)) {
      event.preventDefault();
      return false;
    }

    // Prevent multiple consecutive spaces
    if (isSpace && inputValue.endsWith(' ')) {
      event.preventDefault();
      return false;
    }

    return true;
  }

  keyPressAlphabetAndNumericOnly(event: KeyboardEvent) {
    const key = event.key;
    const input = (event.target as HTMLInputElement).value;

    // Allow letters and numbers
    const isAlphabet = /^[a-zA-Z]$/.test(key);
    const isNumber = /^[0-9]$/.test(key);

    // Allow space only if:
    // - The input is not empty
    // - The last character is not a space
    // - The cursor is at the end of the input
    if (key === ' ') {
      const cursorPosition = (event.target as HTMLInputElement).selectionStart;
      if (
        input.length === 0 ||
        input.endsWith(' ') ||
        cursorPosition !== input.length
      ) {
        //this.alertHelper.viewAlert('error', 'Invalid', 'Only one space between words is allowed, and no leading or trailing spaces.');
        event.preventDefault();
        return false;
      }
      return true;
    }

    if (!(isAlphabet || isNumber)) {
      event.preventDefault();
      return false;
    }

    return true;
  }

  keyPressAlphabetAndNumericWithSpecialCharOnly(event: KeyboardEvent) {
    const key = event.key;

    const allowedPattern = /^[a-zA-Z0-9\/]$/;

    if (!allowedPattern.test(key)) {
      event.preventDefault();
      return false;
    }

    return true;
  }

  isTimeGreaterThan(eventDate: string, toTime: string): boolean {
    const currentTime = new Date();

    // Combine with a space to form a valid datetime string
    const dateTimeString = `${eventDate}T${toTime}`; // e.g., "2025-05-05T21:00:00"
    const elementTime = new Date(dateTimeString);

    // console.log(currentTime,elementTime);

    return currentTime > elementTime;
  }

  keyPressAddressValidation(event: KeyboardEvent) {
    const key = event.key;
    const input = (event.target as HTMLInputElement).value;
    const cursorPosition = (event.target as HTMLInputElement).selectionStart;

    // Alphanumeric and specific special characters
    const isAllowedChar = /^[a-zA-Z0-9(),.\-/]$/.test(key);

    // Handle space
    if (key === ' ') {
      // Disallow space if:
      // - at beginning
      // - after another space
      // - not at the end (e.g., inserting in middle)
      if (
        input.length === 0 ||
        input.endsWith(' ') ||
        cursorPosition !== input.length
      ) {
        event.preventDefault();
        return false;
      }
      return true;
    }

    // If not alphanumeric or allowed special char, prevent input
    if (!isAllowedChar) {
      event.preventDefault();
      return false;
    }

    return true;
  }

  /* Created On : 03-06-2025  || Description : Allow Only Valid Latitude Input (-90 to 90 with up to 6 decimals) */
  keyPressLatiLongValidation(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    const inputValue: string = event.target.value;
    const cursorPosition = event.target.selectionStart;

    // Allow control keys (Backspace, Delete, arrows, etc.)
    if (
      event.ctrlKey ||
      event.metaKey ||
      charCode === 8 ||
      charCode === 37 ||
      charCode === 39 ||
      charCode === 46
    ) {
      return true;
    }

    // Allow digits, one dot, and a minus sign at the beginning
    if (!charStr.match(/[0-9.-]/)) {
      event.preventDefault();
      return false;
    }

    // Only one minus sign at the beginning
    if (charStr === '-' && (cursorPosition !== 0 || inputValue.includes('-'))) {
      event.preventDefault();
      return false;
    }

    // Prevent multiple decimal points
    if (charStr === '.' && inputValue.includes('.')) {
      event.preventDefault();
      return false;
    }

    // Restrict to 6 digits after decimal
    const [integerPart, decimalPart] = inputValue.split('.');
    if (
      decimalPart &&
      inputValue.includes('.') &&
      cursorPosition > inputValue.indexOf('.')
    ) {
      if (decimalPart.length >= 6) {
        event.preventDefault();
        return false;
      }
    }

    // Temporarily build the new value and validate numeric range
    const newValue =
      inputValue.substring(0, cursorPosition) +
      charStr +
      inputValue.substring(cursorPosition);

    const numValue = parseFloat(newValue);
    if (!isNaN(numValue) && (numValue < -90 || numValue > 90)) {
      event.preventDefault();
      return false;
    }

    return true;
  }

  validateNameInput(event: any, ...types: any) {
    const charCode = event.which ? event.which : event.keyCode;

    // allow space
    if (types.includes('space') && charCode === 32) return true;

    // allow dot (.)
    if (types.includes('dot') && charCode === 46) return true;

    // allow comma (,)
    if (types.includes('comma') && charCode === 44) return true;

    // allow hyphen (-)
    if (types.includes('hyphen') && charCode === 45) return true;

    // allow apostrophe (')
    if (types.includes('apostrophe') && charCode === 39) return true;

    // allow ampersand (&)
    if (types.includes('ampersand') && charCode === 38) return true;

    // allow digits 0-9
    if (charCode >= 48 && charCode <= 57) return true;

    // allow uppercase letters A-Z
    if (charCode >= 65 && charCode <= 90) return true;

    // allow lowercase letters a-z
    if (charCode >= 97 && charCode <= 122) return true;

    // disallow everything else
    return false;
  }

  validateReasonInput(event: any, ...types: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;

    // allow space
    if (types.includes('space') && charCode === 32) return true;

    // allow comma (,)
    if (types.includes('comma') && charCode === 44) return true;

    // allow hyphen (-)
    if (types.includes('hyphen') && charCode === 45) return true;

    // allow slash (/)
    if (types.includes('slash') && charCode === 47) return true;

    // allow question mark (?)
    if (types.includes('question') && charCode === 63) return true;

    // allow dot (.)
    if (types.includes('dot') && charCode === 46) return true;

    // allow left parenthesis (()
    if (types.includes('leftParen') && charCode === 40) return true;

    // allow right parenthesis ())
    if (types.includes('rightParen') && charCode === 41) return true;

    // allow digits 0-9
    if (charCode >= 48 && charCode <= 57) return true;

    // allow uppercase letters A-Z
    if (charCode >= 65 && charCode <= 90) return true;

    // allow lowercase letters a-z
    if (charCode >= 97 && charCode <= 122) return true;

    // block all others
    event.preventDefault();
    return false;
  }
}
