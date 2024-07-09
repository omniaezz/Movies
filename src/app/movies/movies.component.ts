import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit{
  trendingMovies:any[]=[];
  pagesNumber:number[]=[];
  currentPage:number=1;
  totalPages: number = 50; 
  pageSize: number = 5; 
  baseUrl:string = "https://image.tmdb.org/t/p/original";
  constructor(private _MoviesService:MoviesService,private _NgxSpinnerService:NgxSpinnerService){}
  
  getMovies(pageNumber:number){
    this._NgxSpinnerService.show();
    this.currentPage = pageNumber;
    localStorage.setItem('Moviepage',JSON.stringify(pageNumber));
    this._MoviesService.getTrendingPaginated('movie',pageNumber).subscribe({
      next:(response)=>{
       this.trendingMovies = response.results;
       this.updatePagination();
       setTimeout(() => {
        this._NgxSpinnerService.hide();
       }, 1000)
      }
    })
    
  }
  

  getNextMovie(){
     this.currentPage++;
     this.getMovies(this.currentPage);
  }

  getPrevMovie(){
    this.currentPage--;
    this.getMovies(this.currentPage);
  }

  updatePagination() {
    const startPage = Math.max(1, this.currentPage - Math.floor(this.pageSize / 2));
    const endPage = Math.min(this.totalPages, startPage + this.pageSize - 1);

    this.pagesNumber = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pagesNumber.push(i);
    }
  }

  ngOnInit(): void {
    const savedPage = localStorage.getItem('Moviepage');
    this.currentPage = savedPage ? parseInt(savedPage) : 1;
    this.getMovies(this.currentPage);
    this.updatePagination();
   }
}
