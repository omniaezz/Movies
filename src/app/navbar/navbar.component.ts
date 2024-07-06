import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin:boolean = false;
  constructor(private _AuthService:AuthService){
  }

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:()=>{
        if(this._AuthService.userData.getValue() !=null){
            this.isLogin = true;
        }else{
            this.isLogin = false;
        }
      }
    })
  }

  logOut(){
    this._AuthService.signOut();
  }
}
