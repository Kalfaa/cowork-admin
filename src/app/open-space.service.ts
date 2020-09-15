import { Injectable } from '@angular/core';
import {OpenSpace, User} from "./interface/login";
import {environment} from "../environments/environment";
import {map} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OpenSpaceService {

  constructor(private http: HttpClient) { }


  post(name,description){
    return this.http.post<OpenSpace>(`${environment.apiUrl}/openspace/`, { name, description})
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(resp);
  }))
  }
}
