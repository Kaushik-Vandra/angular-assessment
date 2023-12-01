import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private secretKey = "ADMIN_DETAILS";

  constructor() { }

  encryptObject(payload: any) {
    const stringified = JSON.stringify(payload);
    return this.encrypt(stringified);
  }

  encrypt(value: string): string {
    return AES.encrypt(value, this.secretKey).toString();
  }

  decrypt(textToDecrypt: string) {
    return AES.decrypt(textToDecrypt, this.secretKey).toString(enc.Utf8);
  }
}
