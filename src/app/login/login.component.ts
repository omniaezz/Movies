import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private _AuthService:AuthService,
              private _Router:Router,private _ToastrService:ToastrService,
              private _NgxSpinnerService:NgxSpinnerService) {}

  submitLoginForm(){
    this.loginForm.value.Id='';
    this.isLoading = true;
    this._NgxSpinnerService.show();
    this._AuthService.signIn(this.loginForm.value).subscribe({
      next:(response)=>{
        this._ToastrService.success('Hello!', 'Login Successfully!');
        localStorage.setItem("userToken",response.entity.token);
        this._AuthService.saveUserData();
        this.isLoading=false;
        this._Router.navigate(['/home']);
        setTimeout(() => {
          this._NgxSpinnerService.hide();
        }, 1000);
      },error:(response)=>{
        this.error = "Data Isn't Valid";
        this._ToastrService.error(this.error,'oops!');
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
