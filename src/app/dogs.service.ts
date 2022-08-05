import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';


export interface Dog {
  index: number,
  breed?: string,
  message: string,
  status: string
}


@Injectable({
  providedIn: 'root'
})

export class DogsService {

  private dogApiURL: string = 'https://dog.ceo/api/breeds/image/random';

  private dogs$ = new BehaviorSubject<Dog[]>([]);

  constructor(
    private http: HttpClient
    ) { }

  public getDogs(): Observable<Dog[]> {
    return this.dogs$;
  }

  public initDogs(numberOfDogs: number) :void {
    const dogsToFetch: any = new Array(numberOfDogs).fill(this.fetchDog());
    let dogs: any = [];
    dogsToFetch.forEach((req: any, index:number) => {
      req.subscribe((res: any) => dogs.push({...res, index, breed: this.getDogBreed(res)}))      
    });
    this.dogs$.next(dogs)
    console.log("These are the starting dogs:", this.dogs$.value)
  }

  public changeDog(dogIndex: number) {
    console.log("changeDog");
    this.fetchDog().pipe(
      tap((newDog) => {
        console.log("The new dog is", newDog)
        this.dogs$.next(
          this.dogs$.value.map((dog,i) => dogIndex === i ? {...newDog, index: i, breed: this.getDogBreed(newDog)} : dog)
        )
      })
    ).subscribe();
  }

  private fetchDog(): Observable<Dog>{
    console.log("fetching a dog...")
    return this.http.get<Dog>(this.dogApiURL);
  }

  private getDogBreed(apiResponse: Dog) {
    const dogBreed = /breeds\/([a-z-]+)\//.exec(apiResponse.message)
    const formattedDogBreed = dogBreed![1].split("-").map((word: string) => {return word[0].toUpperCase() + word.substring(1)}).join(" ");
    return formattedDogBreed;
  }

}
