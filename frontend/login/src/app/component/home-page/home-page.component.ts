import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  userName = this.authSrc.getUserName();
  firstName = this.authSrc.getFirstName();
  lastName = this.authSrc.getLastName();
  email = this.authSrc.getEmail();
  role = this.authSrc.getRole()[0]['role'];

  constructor(private authSrc: AuthService) {}


}
