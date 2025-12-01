import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  // ❗ Move this to environment.ts later
  private readonly secretKey = environment.cryptoJSSecretKey;

  constructor() {}

  // 🔐 Fast & simple AES encrypt
 encrypt(data: any): string {
    try {
      const json = JSON.stringify(data);
      const ciphertext = CryptoJS.AES.encrypt(json, this.secretKey).toString();
      return ciphertext;
    } catch (e) {
      console.error('Encryption error:', e);
      return '';
    }
  }

  // 🔓 Decrypt what encrypt() produced
  decrypt(cipherText: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
      const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedStr) {
        console.error('Decryption failed – empty string (wrong key or corrupted data)');
        return null;
      }

      return JSON.parse(decryptedStr);
    } catch (e) {
      console.error('Decryption error:', e);
      return null;
    }
  }
}
