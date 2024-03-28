import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor( private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("*****");
 console.log(request.url);
 if(!request.url.includes("/auth/login")){
  let Newreq=request.clone(
    {
     headers:request.headers.set('Authorization', 'Bearer' +this.auth.accessToken)
    }
  )
  return next.handle(Newreq).pipe(
   catchError(err=> {
    if(err.status==401)
    {
      this.auth.logout();
    }
    return throwError(err.message)
   })
  );
 }else return next.handle(request);
    
  }
}
