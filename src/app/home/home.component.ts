import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  trendingMovies:any[]=[];
  trendingTv:any[]=[];
  trendingPeople:any[] = [];
  baseUrl:string = "https://image.tmdb.org/t/p/original";
  constructor(private _MoviesService:MoviesService){}
  
  getMovies(){
    this._MoviesService.getTrending('movie').subscribe((response)=>{
      console.log(response);
      
       this.trendingMovies = response.results.slice(0,10);
    })
  }

  getTvs(){
    this._MoviesService.getTrending('tv').subscribe((response)=>{
       this.trendingTv = response.results.slice(0,10);
    })
  }

  // getPeople(){
  //   this._MoviesService.getTrending('people').subscribe((response)=>{
  //      this.trendingPeople = response.results;
  //   })
  // }

  ngOnInit(): void {
    this.getMovies();
    this.getTvs();
    // this.getPeople();
   }
}
