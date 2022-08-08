import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DogsService, Dog } from '../dogs.service';

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
    this.dogService.initDogs(6)
    this.dogs$ = this.dogService.getDogs();
  }

  openDog(dogIndex: number) {
    this.dogService.changeDog(dogIndex);
    this.dogService.selectDog(dogIndex);
  }

}
