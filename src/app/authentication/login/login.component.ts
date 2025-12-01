// angular import
import { Component, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { CryptoService } from 'src/app/core/services/crypto-service';
import { AlertHelper } from 'src/app/core/helper/alert-helper';
import { FormValidationService } from 'src/app/core/validation/form-validation';
import { LoginService } from '../Services/login-service';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  constructor(
    private fb: FormBuilder,
    private cryptoService: CryptoService,
    private alertHelper: AlertHelper,
    private formValidationService: FormValidationService,
    private el: ElementRef,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

 

async onSubmit(): Promise<void> {
  // your custom validation
  if (!this.formValidationService.validateForm(
    this.loginForm,
    this.getReadableFieldName.bind(this),
    this.el
  )) {
    return;
  }

  const formData = this.loginForm.value; 

  const payload = {
    email: formData.email,      // ✅ use the actual properties
    password: formData.password // ✅ not formData.value
  };

  // 🔐 Encrypt payload with AES
  const encryptedData = this.cryptoService.encrypt(payload);
  console.log(encryptedData);
  const param = {
    data: encryptedData
  }
  const response : any = await lastValueFrom(this.loginService.adminConsoleLogin(param));

}


  private getReadableFieldName(fieldName: string): string {
    const fieldMappings: { [key: string]: string } = {
      email: 'Email',
      password: 'Password'
    };
    return fieldMappings[fieldName] || fieldName;
  }
}
