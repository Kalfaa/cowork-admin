import { Injectable } from '@angular/core';
import {OpenSpace, Room, User, WorkEvent} from "./interface/login";
import {environment} from "../environments/environment";
import {map} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  post(name,description,openSpace,date:string,file:File){
    const formData: FormData = new FormData();
    if(file!==null){
      formData.append('file', file, file.name);
    }
    formData.append('name',name);
    formData.append('description',description);
    formData.append('openSpace',openSpace);
    formData.append('date',date);
    return this.http.post<WorkEvent>(`${environment.apiUrl}/event/`, formData)
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(resp);
  }))
  }

  read(){
    return this.http.get<WorkEvent[]>(`${environment.apiUrl}/event/`)
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return resp;
      }))
  }

  readOne(id){
    return this.http.get<WorkEvent>(`${environment.apiUrl}/event/${id}`)
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return resp;
      }));
  }
  getImage(filename:string) {
    return this.http.get<any>(`${environment.apiUrl}/event/file/${filename}`)
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return resp;
      }));
  }

  readForOpenSpace(openSpaceId:string){
    return this.http.get<WorkEvent[]>(`${environment.apiUrl}/event/openSpace/${openSpaceId}`)
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return resp;
      }));
  }



}
