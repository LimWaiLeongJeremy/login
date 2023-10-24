import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../service/auth/auth.service";
import { LoginService } from "../service/login/login.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private authSrv: AuthService,
        private router: Router,
        private loginSrv: LoginService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.authSrv.getToken() !== null) {
            const role = route.data['roles'] as Array<string>;
            if (role) {
                const match = this.loginSrv.roleMatch(role);
                if (match) {
                    return true;
                } else {
                    this.router.navigate(['/forbidden']);
                    return false;
                }
            }
        }
        this.authSrv.clear();
        this.router.navigate(['/login']);
        return false;
    }
}