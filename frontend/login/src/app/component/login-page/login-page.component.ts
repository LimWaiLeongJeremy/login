import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.createCredential();
  }

  
  private createCredential(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>('', Validators.required),
      password: this.fb.control<string>('', Validators.required),
    });
  }

}
