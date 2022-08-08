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

  private selectedDog$ = new BehaviorSubject<Dog|null>(null);

  constructor(
    private http: HttpClient
    ) { }

  public getDogs(): Observable<Dog[]> {
    return this.dogs$;
  }

  public selectDog(dogIndex: number) {
    console.log("You have selected dog Nr. " + this.dogs$.value[dogIndex].index)
    this.selectedDog$.next(this.dogs$.value[dogIndex]);
    console.log(this.selectedDog$.value)
  }
  
  public removeDog() {
    console.log("Closed dog!")
    this.selectedDog$.next(null);
  }

  public getSelectedDog = this.selectedDog$.asObservable();

  public initDogs(numberOfDogs: number) :void {
    const dogsToFetch: any = new Array(numberOfDogs).fill(this.fetchDog());
    let dogs: any = [];
    dogsToFetch.forEach((req: any, index:number) => {
      req.subscribe((res: any) => dogs.push({...res, index, breed: this.getDogBreed(res)}))      
    });
    this.dogs$.next(dogs)
  }

  public changeDog(dogIndex: number) {
    this.fetchDog().pipe(
      tap((newDog) => {
        this.dogs$.next(
          this.dogs$.value.map((dog,i) => dogIndex === i ? {...newDog, index: i, breed: this.getDogBreed(newDog)} : dog)
        )
      })
    ).subscribe();
  }

  private fetchDog(): Observable<Dog>{
    return this.http.get<Dog>(this.dogApiURL);
  }

  private getDogBreed(apiResponse: Dog) {
    const dogBreed = /breeds\/([a-z-]+)\//.exec(apiResponse.message)
    const formattedDogBreed = dogBreed![1].split("-").map((word: string) => {return word[0].toUpperCase() + word.substring(1)}).reverse().join(" ");
    return formattedDogBreed;
  }

}
