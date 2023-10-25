/* The AdminPageComponent allows only user with admin role to access 
and display a button for navigating to the home page . */
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  constructor(private router: Router) { }

  public routeToHomePage() {
    this.router.navigate(['/home']);
  }

}
