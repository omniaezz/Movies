import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent implements OnInit{

  trendingPersons:any[]=[];

  baseUrl:string = "https://image.tmdb.org/t/p/original";
  constructor(private _MoviesService:MoviesService,private _NgxSpinnerService:NgxSpinnerService){}
  
  getPeople(){
    this._NgxSpinnerService.show();
    this._MoviesService.getTrending('person').subscribe({
      next:(response)=>{
       this.trendingPersons = response.results;
       setTimeout(() => {
        this._NgxSpinnerService.hide();
       }, 1000)
      }
    })
  }

  ngOnInit(): void {
    this.getPeople()
  }
}
