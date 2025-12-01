import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  adminConsoleLogin(param: any) {
    return this.http.post<any>(`https://localhost:7103/api/Login/login`, param);
  }
}
