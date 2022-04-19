import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../shared/models/login';
import { Register } from '../shared/models/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  API_URL= environment.serUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  private createRequestOptions() {
    var autent = JSON.parse(localStorage.getItem('Autentication'));
    var auth_token = autent.token;
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + auth_token
    });
    return headers;
  }

  login(loginuser: Login): Observable<Login> {
    return this.httpClient.post<Login>(this.API_URL + 'auth/login', loginuser);
  }
  registerUser(registeruser: Register): Observable<Register> {
    return this.httpClient.post<Register>(this.API_URL + 'users/save', registeruser);
  }
  getLoggedInUser() {
    var autent = JSON.parse(localStorage.getItem('Autentication'));
    var auth_token = autent.token;
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.httpClient.get(this.API_URL + 'auth/me', { headers: reqHeader });
  }
}
