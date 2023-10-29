import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private encryptionKey: string = 'OutfituoEncriptionKey';

  constructor() {}

  encryptId(id: number) {
    const ciphertext = CryptoJS.AES.encrypt(
      id.toString(),
      this.encryptionKey
    ).toString();
    return ciphertext;
  }

  // Función para descifrar el ID
  decryptId(ciphertext: string) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.encryptionKey);
    const originalId = bytes.toString(CryptoJS.enc.Utf8);
    return originalId;
  }
}
