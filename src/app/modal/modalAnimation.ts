import { trigger, style, animate, transition, keyframes, query, animateChild } from '@angular/animations';

export const modalContentAnimation = trigger("animateModalContent", [

  transition(":enter", animate("300ms ease-in", keyframes([
    style({transform: "translateY(100%)", offset: 0}),
    style({transform: "translateY(0%)", offset: 1})
  ]))),

  transition(":leave", animate("300ms ease-in", keyframes([
    style({transform: "translateY(0%)", offset: 0}),
    style({transform: "translateY(100%)", offset: 1})
  ]))),
]);

export const animateChildElement = trigger("animateChild", [
  transition(':enter, :leave', [
    query('@animateModalContent', animateChild())
  ])
])
