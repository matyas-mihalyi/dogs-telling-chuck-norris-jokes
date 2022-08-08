import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DogsService, Dog } from '../dogs.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

  public selectedDog: Dog|null = null;

  public closeModal ():void {
    this.dogService.removeDog();
  }

  public blockClosing ():void {
    window.alert(`Please tell this ${this.selectedDog?.breed} that he's a Good Boy first!`)
  }

  public animateText () {
    // to do
  }

  constructor( 
    private dogService: DogsService ) { 
  }

  ngOnInit(): void {
    this.dogService.getSelectedDog.subscribe(dog => this.selectedDog = dog);
  }

}
