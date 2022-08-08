import { Component, OnInit } from '@angular/core';
import { animateChildElement } from '../modal/modalAnimation';
import { Observable } from 'rxjs';

import { DogsService, Dog } from '../dogs.service';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.sass'],
  animations: [ animateChildElement ]
})
export class DogCardComponent implements OnInit {

  public dogs$!: Observable<Dog[]>;

  public selectedDog: Dog|null = null;

  constructor(
    private dogService: DogsService
  ) { }

  ngOnInit(): void {
    this.dogService.initDogs(6)
    this.dogs$ = this.dogService.getDogs();
    this.dogService.getSelectedDog.subscribe(dog => {
      this.updateSelectedDog(dog);
    });
  }

  private updateSelectedDog(dog: Dog|null): void {
    this.selectedDog = dog
  }
  
  openDog(dogIndex: number) {
    this.dogService.changeDog(dogIndex);
    this.dogService.selectDog(dogIndex);
  }

}
