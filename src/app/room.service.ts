import { Injectable } from '@angular/core';
import {OpenSpace, Room, User} from './interface/login';
import {environment} from '../environments/environment';
import {map} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  post(name, description, openSpace, file){
    const formData: FormData = new FormData();
    if(file!==undefined){
      formData.append('file', file, file.name);
    }
    formData.append('name',name);
    formData.append('description',description);
    formData.append('openSpace',openSpace);
    return this.http.post<Room>(`${environment.apiUrl}/room/`, formData)
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(resp);
  }));
  }

  read(){
    return this.http.get<Room[]>(`${environment.apiUrl}/room/`)
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return resp;
      }));
  }

  readOne(id){
    return this.http.get<Room>(`${environment.apiUrl}/room/${id}`)
      .pipe(map(resp => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return resp;
      }));
  }



}
