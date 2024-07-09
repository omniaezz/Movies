import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.scss'
})
export class TvShowsComponent implements OnInit{
  trendingTvs:any[]=[];
  pagesNumber:number[]=[];
  currentPage:number=1;
  totalPages: number = 50; 
  pageSize: number = 5; 
  baseUrl:string = "https://image.tmdb.org/t/p/original";
  constructor(private _MoviesService:MoviesService,private _NgxSpinnerService:NgxSpinnerService){}
  
  getTvs(pageNumber:number){
    localStorage.setItem('Tvpage',JSON.stringify(pageNumber));
    this.currentPage = pageNumber;
    this._NgxSpinnerService.show()
    this._MoviesService.getTrendingPaginated('tv',pageNumber).subscribe({
      next:(response)=>{
       this.trendingTvs = response.results;
       setTimeout(() => {
        this._NgxSpinnerService.hide();
       }, 1000)
      }
    })
    this.updatePagination();
  }

  getNextTv(){
    this.currentPage++;
    this.getTvs(this.currentPage);
 }

 getPrevTv(){
   this.currentPage--;
   this.getTvs(this.currentPage);
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
  const savedPage = localStorage.getItem('Tvpage');
  this.currentPage = savedPage ? parseInt(savedPage) : 1;
  this.getTvs(this.currentPage);
  this.updatePagination();
  }

}
