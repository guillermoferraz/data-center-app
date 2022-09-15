import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(){
    const token = sessionStorage.getItem('tkn') ||" ";
    const headers = new HttpHeaders({
      "Authorization": token
    });
    const options = { headers: headers };
    return this.http.get("http://localhost:4201/user", options);
  }
}
