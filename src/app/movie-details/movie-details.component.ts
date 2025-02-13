import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit{
  similarMovies:any[]=[];
  Title:any ='';
  movieDetails:any={};
  mediaType:string='';
  baseUrl:string = "https://image.tmdb.org/t/p/original";
  constructor(private _ActivatedRoute:ActivatedRoute,
              private _MoviesService:MoviesService,
              private _NgxSpinnerService:NgxSpinnerService
            ){}
  getMovieDetails(id:number,media:string){
    this._NgxSpinnerService.show();
    this._MoviesService.getTrendingDetails(id,media).subscribe({
      next:(response)=>{
        this.movieDetails = response;
        if(media =='movie'){
          this.Title = this.movieDetails.title;  
         }else{
          this.Title = this.movieDetails.original_name;
         }
         this.mediaType = media;
         setTimeout(() => {
          this._NgxSpinnerService.hide();
         }, 1000);
         
      },
      error:()=>{
        this._NgxSpinnerService.hide();
      }
    })
  }


  getSimilarMovies(id:number,mediaType:string){
    this._MoviesService.getSimilar(id,mediaType).subscribe({
      next:(response)=> {
        this.similarMovies = response.results.slice(0,10);
      }
    })
  }
  ngOnInit(): void {
    let {id,media}  = this._ActivatedRoute.snapshot.params;
    this.getMovieDetails(id,media);
    this.getSimilarMovies(id,media);
  }

  getSimilarAndDetails(id:number,media:string){
    this.getMovieDetails(id,media);
    this.getSimilarMovies(id,media);
  }
}
