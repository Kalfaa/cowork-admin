import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from '../../environments/environment';
import {AuthService} from '../auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    console.log('jwt');
    const user = this.accountService.userValue;
    const isLoggedIn = user && user.token.access_token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    console.log(user.token.access_token);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token.access_token}`
        }
      });
    }

    return next.handle(request);
  }
}
