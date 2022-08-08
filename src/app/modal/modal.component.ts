import { Component, OnInit } from '@angular/core';
import { DogsService, Dog } from '../dogs.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  animations: []
})
export class ModalComponent implements OnInit {

  public selectedDog: Dog|null = null;

  public modalState: ModalState = 'closed';

  constructor( 
    private dogService: DogsService ) { 
  }

  public closeModal ():void {
    this.dogService.removeDog();
  }

  public blockClosing ():void {
    window.alert(`Please tell this ${this.selectedDog?.breed} that he's a Good Boy first!`)
  }

  public animateText () {
    // to do
  }

  private applyModalState (selectedDog: Dog|null): void {
    if (selectedDog === null) {
      this.modalState = "closed";
    } else {
      this.modalState = "open"
    }
  }
  
  private updateSelectedDog(dog: Dog|null): void {
    this.selectedDog = dog
  }

  ngOnInit(): void {
    this.dogService.getSelectedDog.subscribe(dog => {
      this.updateSelectedDog(dog);
      this.applyModalState(dog);
    });
  }

}

type ModalState = "open" | "closed";