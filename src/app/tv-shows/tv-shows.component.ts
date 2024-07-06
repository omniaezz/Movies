import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

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
  constructor(private _MoviesService:MoviesService){}
  
  getTvs(pageNumber:number){
    this.currentPage = pageNumber;
    this._MoviesService.getTrendingPaginated('tv',pageNumber).subscribe((response)=>{
       this.trendingTvs = response.results;
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
   this.getTvs(1);
   this.updatePagination();
  }
}
