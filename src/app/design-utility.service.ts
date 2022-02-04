import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  constructor(private http:HttpClient) { }

  // Fetch users
  fetchUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  // Add users
  addUsers(userData: any){
    return this.http.post('https://jsonplaceholder.typicode.com/users', userData)
  }

  // Delete users
  deleteUser(id:number){
    return this.http.delete('https://jsonplaceholder.typicode.com/users/'+id);
  }

  // Update users
  updateUser(payload:any,id:number){
    return this.http.put('https://jsonplaceholder.typicode.com/users/'+id, payload);
  }

}
