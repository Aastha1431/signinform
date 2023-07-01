import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import { User } from './user.interface';
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() {}
    createDb(){
    let users: User[]=[
{id:1,title:"Mr.",firstName:"aadarsh",lastName:"jain",email:"aadarshjain1431@gmail.com",dob:"2007-03-22",password:"Aashi",acceptTerms:true},
{id:2,title:"Mr.",firstName:"Rishi",lastName:"jain",email:"Rishijain1431@gmail.com",dob:"2005-04-22",password:"jyoti",acceptTerms:true}
  ]; 
  return {users};
}
}

  
