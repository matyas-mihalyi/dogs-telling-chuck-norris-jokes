import { Component, Input, OnInit } from '@angular/core';
import { DogsService, Dog } from '../dogs.service';
import { modalContentAnimation } from './modalAnimation';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  animations: [ modalContentAnimation ]
})
export class ModalComponent implements OnInit {

  @Input () selectedDog: Dog|null = null;

  constructor( 
    private dogService: DogsService ) { 
  }

  public closeModal ():void {
    this.dogService.removeDog();
  }

  public blockClosing ():void {
    window.alert(`Please tell this ${this.selectedDog?.breed} that they are a Good Girl or Good Boy first!`)
  }

  public animateText () {
    // to do
  }

  ngOnInit(): void {
    console.log("modal init")
  }

}