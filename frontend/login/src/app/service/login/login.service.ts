/* The LoginService class is responsible for handling login functionality and role matching. */
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
      this.endpoint + '/authenticate',
      loginData,
      {
        headers: this.requestHeader
      }
    );
  }

  /* Checks the list of user roles against the allowed roles define in app.module.ts,
  if match return true else false.*/
  public roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: Roles[] = this.authSrc.getRole();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        return allowedRoles.includes(userRoles[i].role);
      }
    }
    return isMatch;
  }
}
