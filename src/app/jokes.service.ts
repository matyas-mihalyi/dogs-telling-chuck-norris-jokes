import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private apiUrl:string = 'https://api.chucknorris.io/jokes/random';
  
  constructor(
    private http: HttpClient
  ) { }

  private joke = new BehaviorSubject<string>("");
  
  private fetchJoke (){
    this.http.get<ApiResponse>(this.apiUrl).subscribe((res: ApiResponse) => this.joke.next(res.value))
  }

  public getJoke() {
    this.fetchJoke();
    return this.joke.asObservable();
  }
}

interface ApiResponse {
  categories: [];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}