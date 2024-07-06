import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if(this.isBrowser() && localStorage.getItem("userToken") !=null){
      this.saveUserData();
    }
  }

  userData:any = new BehaviorSubject(null);

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
  saveUserData(){
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let decodedUser:object = jwtDecode(token);
    this.userData.next(decodedUser);
  }

  signUp(userData:User):Observable<any>{
    return this._HttpClient.post('http://localhost:5012/api/User/Register',userData)
  }

  signIn(userData:User):Observable<any>{
    return this._HttpClient.post('http://localhost:5012/api/User/Login',userData)
  }

  signOut(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
