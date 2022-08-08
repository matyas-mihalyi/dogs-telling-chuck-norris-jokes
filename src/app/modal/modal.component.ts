import { Component, Input, OnInit } from '@angular/core';

import { modalContentAnimation } from './modalAnimation';
import { DogsService, Dog } from '../dogs.service';
import { JokesService } from '../jokes.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  animations: [ modalContentAnimation ]
})
export class ModalComponent implements OnInit {

  @Input () selectedDog: Dog|null = null;

  joke: string = "";

  constructor( 
    private dogService: DogsService,
    private jokeService: JokesService
    ) { 
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
    this.jokeService.getJoke().subscribe(joke => this.joke = joke)
  }

}