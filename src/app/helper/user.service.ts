import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService{
private API_BASE_PATH : string= "https://locall.host/4200/api/";
  constructor(private httpService : HttpClient) {}
getUsers(){
  return this.httpService.get(this.API_BASE_PATH +"users");
}
getUser(userId: number)
{
  return this.httpService.delete(`${this.API_BASE_PATH}users/${userId}`)
}
addUser(user:User)
{
  return this.httpService.post(`${this.API_BASE_PATH}users`,user)
}
updateUser(user:User)
{
  return this.httpService.put(`${this.API_BASE_PATH}users/${user.id}`,user)
}

deleteUser(userId:number)
{
  return this.httpService.delete(`${this.API_BASE_PATH}users/${userId}`)
}
}
