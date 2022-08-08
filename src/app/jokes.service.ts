import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private jokeThemes: string[] = ["animal","dev","fashion","food","history","movie","music","science","travel"]
  
  constructor(
    private http: HttpClient
    ) { }
      
  private getRandomTheme (themes: string[]):string {
    const randomIndex = Math.floor(Math.random() * ((themes.length - 1) - 0 + 1) + 0);
    console.log(randomIndex);
    return themes[randomIndex];
  }
  
  private apiUrl ():string {
    return `https://api.chucknorris.io/jokes/random?category=${this.getRandomTheme(this.jokeThemes)}`;
  }
  
  private joke = new BehaviorSubject<string>("");
  
  private fetchJoke (){
    this.http.get<ApiResponse>(this.apiUrl()).subscribe((res: ApiResponse) => this.joke.next(res.value))
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