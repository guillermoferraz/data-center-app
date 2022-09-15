import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterDataTypes {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

type UserType = {
  Id: string;
  Email: string;
  Lastname: string;
  Firstname: string;
  Token: string;
}

type LoginDataTypes = Omit<RegisterDataTypes, 'firstname' | 'lastname'> & {user?: UserType};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(ResgisterData: RegisterDataTypes):Observable<RegisterDataTypes> {
    return this.http.post('http://localhost:4201/register', ResgisterData)
  }

  login(LoginData: LoginDataTypes):Observable<LoginDataTypes>{
    return this.http.post('http://localhost:4201/login', LoginData)
  }
}
