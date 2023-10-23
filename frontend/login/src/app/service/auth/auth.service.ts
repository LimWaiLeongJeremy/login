import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Roles } from "../../model/role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private token!: string;
  private tokenSubject = new Subject<string>();
  private usernameSubject = new Subject<string>();
  token$ = this.tokenSubject.asObservable();
  userName$ = this.usernameSubject.asObservable();
  private roleChange = new Subject<any>();

  public getRole() {
    let role;
    try {
      const roleString = sessionStorage.getItem('roles') || '{}';
      role = JSON.parse(roleString);
    } catch (error) {
      console.info(error);
    }
    return role;
  }

  public getToken() {
    return sessionStorage.getItem('jwtToken');
  }


  constructor() { }
}
