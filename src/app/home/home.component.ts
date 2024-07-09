import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';

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
  constructor(private _MoviesService:MoviesService,private _NgxSpinnerService:NgxSpinnerService){}
  
  getMovies(){
    this._NgxSpinnerService.show();
    this._MoviesService.getTrending('movie').subscribe({
      next:(response)=>{
      
       this.trendingMovies = response.results.slice(0,10);
       setTimeout(() => {
        this._NgxSpinnerService.hide();
       }, 1000);
       
      }
    })
  }

  getTvs(){
    this._MoviesService.getTrending('tv').subscribe((response)=>{
       this.trendingTv = response.results.slice(0,10);
    })
  }


  ngOnInit(): void {
    this.getMovies();
    this.getTvs();
   }


   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayHoverPause: false,
    navSpeed: 700,
    margin:15,
    navText: ['', ''],

    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
