import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth/auth.service";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    token = this.authsrv.getToken() || '';
    constructor(
        private authsrv: AuthService,
        private router: Router,
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.headers.get('NoAuth') === 'True') {
            return next.handle(req.clone());
        }

        const token = this.authsrv.getToken() || '';

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ${token}'
                }
            });
        }

        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    console.info('login with error: ', err.message);
                    this.authsrv.clear()
                    this.router.navigate((['/login']));
                    return throwError('Unauthorized');
                } else if (err.status === 403) {
                    console.info(err);
                    this.router.navigate((['/forbidden']));
                    return throwError('Access Denied')
                } else {
                    console.info(err);
                    return throwError(err.message);
                }
            })
        );
    }


}