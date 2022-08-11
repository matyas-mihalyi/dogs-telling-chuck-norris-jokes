import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { modalContentAnimation } from './modalAnimation';
import { DogsService, Dog } from '../dogs.service';
import { JokesService } from '../jokes.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  animations: [ modalContentAnimation ]
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input () selectedDog: Dog|null = null;

  private joke: string = "";

  public spelledJoke: string = "";

  private spellingInterval: undefined | ReturnType<typeof setInterval>;

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

  private addNextChar () {
    const nextCharIndex = this.spelledJoke.length;

    if (this.joke[nextCharIndex]) {
      this.spelledJoke = this.spelledJoke + this.joke[nextCharIndex];
    } else {
      this.stopSpelling();
    }
  }
  
  private startSpelling() {
    this.spellingInterval = setInterval(()=> this.addNextChar(), 30)
  } 
  
  private stopSpelling() {
    clearInterval(this.spellingInterval)
  }

  ngOnInit(): void {
    this.jokeService.getJoke().subscribe(res => {
      this.joke = res.value;
      this.startSpelling();
    });
  }
  
  ngOnDestroy(): void {
    this.stopSpelling();
  }
}