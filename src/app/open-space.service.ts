import { Injectable } from '@angular/core';
import {OpenHours, OpenSpace, ToolType, User} from "./interface/login";
import {environment} from "../environments/environment";
import {map} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OpenSpaceService {

  constructor(private http: HttpClient) { }


  post(name,description,openHours=null){
    return this.http.post<OpenSpace>(`${environment.apiUrl}/openspace/`, { name, description,openHours})
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(resp);
  }))
  }

  read(){
    return this.http.get<OpenSpace[]>(`${environment.apiUrl}/openspace/`)
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return resp;
      }))
  }

  readOne(id){
    return this.http.get<OpenSpace>(`${environment.apiUrl}/openspace/${id}`)
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return resp;
      }));
  }

  addTool(name,openSpaceId,type=ToolType.TOOL){
    return this.http.post<OpenSpace>(`${environment.apiUrl}/openspace/${openSpaceId}/addTool`, {name,type})
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(resp);
      }))
  }


  changeHours(openSpaceId: string, openHours:OpenHours) {
    return this.http.post<OpenSpace>(`${environment.apiUrl}/openspace/${openSpaceId}/changeHours`, openHours)
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(resp);
      }))
  }
}
