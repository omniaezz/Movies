import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  isLoading:boolean = false;
  error:string='';
  loginForm:FormGroup = new FormGroup({
    Email : new FormControl(null,[Validators.required,Validators.email]),
    Password : new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-zA-Z]+[0-9]+[^a-zA-Z0-9]+$/)])
  })

  constructor(private _AuthService:AuthService,private _Router:Router) {}

  submitLoginForm(){
    this.loginForm.value.Id='';
    this.isLoading = true;
    this._AuthService.signIn(this.loginForm.value).subscribe({
      next:(response)=>{
        localStorage.setItem("userToken",response.entity.token);
        this._AuthService.saveUserData();
        this.isLoading=false;
        this._Router.navigate(['/home'])
      },error:(response)=>{
        this.error = "Data Isn't Valid";
        this.isLoading=false;
      }
    })
  }


  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:()=>{
        if(this._AuthService.userData.getValue() !=null){
            this._Router.navigate(['/home']);
        }
      }
    })
  }
}
