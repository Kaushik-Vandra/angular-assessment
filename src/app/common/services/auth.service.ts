import { Injectable } from '@angular/core';
import { AuthDataI, UserI } from 'src/app/common/interfaces/auth.interface';
import { EncryptionService } from './encryption.service';
import { Router } from '@angular/router';

const AUTH = "authDetail";
const ACCESS_TOKEN = "token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public data: AuthDataI = new AuthDataI();

  constructor(
    public encryptionService: EncryptionService,
    private router: Router
  ) { }

  getToken() {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      return localStorage.getItem(ACCESS_TOKEN);
    } else if (this.getAuthDetail()) {
      return this.getAuthDetail()?.accessToken;
    } else {
      return "";
    }
  }

  getAuthDetail(): UserI {
    let authData!: UserI;
    if (localStorage.getItem(AUTH) != null) {
      let decrypt = this.encryptionService.decrypt(localStorage.getItem(AUTH) || '{}');
      authData = JSON.parse(decrypt);
    }
    return authData;
  }

  setAuth(data: any) {
    if (data.accessToken) {
      const token = data.accessToken;
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.setItem(ACCESS_TOKEN, token);
    }

    const authDetail = data;
    const encrypt = this.encryptionService.encrypt(JSON.stringify(authDetail));

    localStorage.removeItem(AUTH);
    localStorage.setItem(AUTH, encrypt);
    
    let decrypt = this.encryptionService.decrypt(localStorage.getItem(AUTH) || '{}');
    this.data = JSON.parse(decrypt);
    return this.data;
  }

  isAuthenticated() {
    if (localStorage.getItem(AUTH) != null) {
      let decrypt = this.encryptionService.decrypt(localStorage.getItem(AUTH) || '{}');
      this.data = JSON.parse(decrypt);
    }
    return this.isLoggedIn();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem(AUTH);
    this.router.navigate(['/']);
  }
}