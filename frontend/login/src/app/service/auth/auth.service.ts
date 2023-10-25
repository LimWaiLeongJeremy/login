/* The AuthService class is responsible for managing authentication-related functionality, such as
storing and retrieving user information and tokens, and emitting events for role changes. */
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
  private userFirstNameSubject = new Subject<string>();
  private userLastNameSubject = new Subject<string>();
  private userEmailSubject = new Subject<string>();
  token$ = this.tokenSubject.asObservable();
  userName$ = this.usernameSubject.asObservable();
  private roleChange = new Subject<any>();


  public setRole(roles: Roles[]) {
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }

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


  public setUserName(userName: string) {
    this.usernameSubject.next(userName);
    sessionStorage.setItem('userName', userName);
  }

  public getUserName() {
    return sessionStorage.getItem('userName');
  }


  public setToken(jwtToken: string) {
    sessionStorage.setItem('jwtToken', jwtToken);
    this.token = jwtToken;
    this.tokenSubject.next(jwtToken);
  }

  public getToken() {
    return sessionStorage.getItem('jwtToken');
  }


  public setFirstName(firstName: string) {
    this.userFirstNameSubject.next(firstName);
    sessionStorage.setItem('firstName', firstName);
  }

  public getFirstName() {
    return sessionStorage.getItem('firstName');
  }


  public setLastName(lastName: string) {
    this.userLastNameSubject.next(lastName);
    sessionStorage.setItem('lastName', lastName);
  }

  public getLastName() {
    return sessionStorage.getItem('lastName');
  }


  public setEmail(email: string) {
    this.userEmailSubject.next(email);
    sessionStorage.setItem('email', email);
  }

  public getEmail() {
    return sessionStorage.getItem('email');
  }


  public clear() {
    sessionStorage.clear();
    localStorage.clear();
  }

  public authenticated() {
    const token = sessionStorage.getItem('jwtToken');
    return this.getToken() && this.getRole();
  }

  public emitRoleChange(role: any) {
    this.roleChange.next(role);
  }


}
