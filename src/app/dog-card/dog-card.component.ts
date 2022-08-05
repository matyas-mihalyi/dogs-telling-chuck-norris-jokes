import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { DogsService, Dog } from '../dogs.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.sass']
})
export class DogCardComponent implements OnInit {
  public dogs$!: Observable<Dog[]>;

  constructor(
    private dogService: DogsService
  ) { }

  ngOnInit(): void {
    this.dogService.initDogs(9)
    this.dogs$ = this.dogService.getDogs();

    // this.dogService.fetchDog().subscribe(res => this.testDog = res);
  }

  changeDog() {
    this.dogService.changeDog(2);
  }

}
