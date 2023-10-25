/* The ForbiddenPageComponent presents abutton that user can be 
redirect to home page when user don't hold the access 
right and being directed to forbidden page. */
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-forbidden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.css']
})
export class ForbiddenPageComponent {
  constructor(private router: Router) { }

  public routeToHomePage() {
    this.router.navigate(['/home']);
  }
}
