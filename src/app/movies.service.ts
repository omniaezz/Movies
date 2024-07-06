import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient:HttpClient) {}

   getSimilar(id:number,mediaType:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=488ad9c17925c90dc592ca5d8d2a2869&language=en-US&page=1`)
   }

   getTrending(mediaType:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=488ad9c17925c90dc592ca5d8d2a2869&page=1`)
   }

   getTrendingPaginated(mediaType:string,pageNumber:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=488ad9c17925c90dc592ca5d8d2a2869&page=${pageNumber}`)
   }

   getTrendingDetails(id:number,mediatype:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediatype}/${id}}?api_key=488ad9c17925c90dc592ca5d8d2a2869`)
  }
}
