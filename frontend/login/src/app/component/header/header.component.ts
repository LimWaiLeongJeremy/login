/* The HeaderComponent handles the header section of the
application navigation. 
1) It will check for user roll, if admin show admin dashboad button that allows admin to navigate to admin page.
2) If authenticated state is true, show logout button. */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userRole: string | null = null;
  item: MenuItem[] | undefined;

  constructor(
    public authSrv: AuthService,
    public router: Router,
  ) { }


  public authenticated() {
    this.userRole = this.authSrv.getRole();
    return this.authSrv.authenticated();
  }

  loggedOut() {
    this.authSrv.clear();
    this.userRole = null;
    this.authSrv.emitRoleChange(null);
    this.router.navigate(['/login']);
  }

  goToAdminPage() {
    this.router.navigate(["/admin"]);
  }

}
