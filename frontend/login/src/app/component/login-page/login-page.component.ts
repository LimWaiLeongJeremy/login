import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from "src/app/service/login/login.service";
import { AuthService } from "src/app/service/auth/auth.service";
import { Credential } from "src/app/model/credential";
import { AuthResponse } from 'src/app/model/authResponse';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  credential!: Credential;
  sub!: Subscription;
  constructor(
    private fb: FormBuilder,
    private loginSrc: LoginService,
    private authSrc: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.createCredential();
  }


  async submit() {
    this.credential = this.form.value as Credential;
    this.sub = this.loginSrc.login(this.credential).subscribe(
      (response: AuthResponse) => {
        sessionStorage.clear();
        localStorage.clear;
        this.authSrc.setUserName(response.user.userName);
        this.authSrc.setFirstName(response.user.firstName);
        this.authSrc.setLastName(response.user.lastName);
        this.authSrc.setEmail(response.user.email); 
        this.authSrc.setRole(response.user.role);
        this.authSrc.setToken(response.jwtToken);
        localStorage.setItem('token', response.jwtToken);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.info(error);
      }
    )
  }
  
  private createCredential(): FormGroup {
    return this.fb.group({
      userName: this.fb.control<string>('', Validators.required),
      password: this.fb.control<string>('', Validators.required),
    });
  }

}
