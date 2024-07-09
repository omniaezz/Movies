import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  isLoading:boolean = false;
  error:string='';
  registerForm:FormGroup = new FormGroup({
    FirstName : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    LastName : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    Age : new FormControl(null,[Validators.required,Validators.min(10),Validators.max(80)]),
    Email : new FormControl(null,[Validators.required,Validators.email]),
    Password : new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-zA-Z]+[0-9]+[^a-zA-Z0-9]+$/)])
  })


  constructor(private _AuthService:AuthService,private _Router:Router,
              private _ToastrService:ToastrService) {}

  submitRegisterForm(){
    this.registerForm.value.Id='';
    this.isLoading = true;
    this._AuthService.signUp(this.registerForm.value).subscribe({
      next:(response)=>{
        this._ToastrService.success('Hello!', 'Registered Successfully!');
        this.isLoading=false;
        this._Router.navigate(['/login'])
      },error:(response)=>{
        this.error = "Data Isn't Valid ";;
        this._ToastrService.error(this.error , 'oops! Faild To Register');
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
