import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from "rxjs";
import { AuthService } from './auth.service';
import { LoginResponsePayload } from '../login/login.response.payload';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshed = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private authService :AuthService){
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
               
        const accessToken = this.authService.getAccessToken();
        if(accessToken && !req.url.includes("auth")){
            req = this.addAccessToken(accessToken, req);
            return next.handle(req).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse  && error.status === 401) {
                    return this.handleExpireAccessToken(req, next);
                } else {
                    return throwError(() => new Error(error));
                }
            }));
        }
    
       return  next.handle(req);
    //    .pipe(
    //         //catchError(this.handleCommonError) // then handle other errors 500...
    //     );   
       
    }
    
    private handleCommonError(errorResponse: HttpErrorResponse ) {
         if (errorResponse.status === 0) {
          console.error('An error occurred:', errorResponse.error);
        } else {
          console.error(`Backend returned code ${errorResponse.status}, body was: `, errorResponse.message);
        }
        return throwError(() => new Error(JSON.parse(errorResponse.error).message));
      }

    private addAccessToken(accessToken: String, req: HttpRequest<any>) :HttpRequest<any> {
       return req.clone({
            headers: req.headers.set('Authorization','Bearer ' + accessToken)
        });
    }

    private handleExpireAccessToken(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
    
            console.log('Automatically initiates a request for a new access token since the current one expires.');
            this.refreshTokenSubject.next(null);
            return this.authService.performRefreshToken()
            .pipe(switchMap(
                    (loginResponsePayload: LoginResponsePayload) => {
                    this.refreshTokenSubject.next(loginResponsePayload.accessToken);
                    return next.handle(this.addAccessToken(loginResponsePayload.accessToken, req));

                 }))
        
    }
    
    
}