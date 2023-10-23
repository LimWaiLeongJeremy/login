import { Injectable } from '@angular/core';
import { environment } from "../environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { AuthResponse } from "../../model/authResponse";
import { Roles } from 'src/app/model/role';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint = environment.serverUrl;
  requestHeader = new HttpHeaders({ 'No-Auth': 'true' });
  userName!: string;
  password!: string;
  body = {};
  token = this.authSrc.getToken() || '';

  constructor(private authSrc: AuthService, private http: HttpClient) { }

  public login(loginData: any) {
    this.userName = loginData.userName;
    this.password = loginData.password;
    return this.http.post<AuthResponse>(
      this.endpoint + '?authenticate',
      loginData,
      {
        headers: this.requestHeader
      }
    );
  }

  public roleMatc(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: Roles[] = this.authSrc.getRole();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].role === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}
