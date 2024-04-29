import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespGetUser } from './modals/GetUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}
 
  GetUser() {
    return this.http.get<RespGetUser[]>(`${this.API_URL}/users`);
  }

  GetUserById(id: string) {
    return this.http.get<RespGetUser>(`${this.API_URL}/users/${id}`);
  }

  GetTodoById(id: string) {
    return this.http.get<RespGetUser>(`${this.API_URL}/users/${id}`);
  }

  createUser(name: string, username: string,password: string) {
    const data = { name, username ,password};
    return this.http.post(`${this.API_URL}/users`, data);
  }

  Userexists( username: string) {
    const data = { username };
    return this.http.post(`${this.API_URL}/users`, data);
  }


  DeleteUser(id: string) {
    return this.http.delete<any>(`${this.API_URL}/users/${id}`);
  }
  
  updateUser(id: string, name: string, username: string, password: string) {
    const data = { name, username, password };
    return this.http.patch(`${this.API_URL}/users/${id}`, data);
  }
}
