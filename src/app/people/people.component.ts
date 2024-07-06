import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent implements OnInit{

  trendingPersons:any[]=[];

  baseUrl:string = "https://image.tmdb.org/t/p/original";
  constructor(private _MoviesService:MoviesService){}
  
  getPeople(){
    this._MoviesService.getTrending('person').subscribe((response)=>{
       this.trendingPersons = response.results;
    })
  }

  ngOnInit(): void {
    this.getPeople()
  }
}
