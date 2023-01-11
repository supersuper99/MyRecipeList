import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <ion-card>
      <ion-card-header>{{ recipe.name }}</ion-card-header>
      <ion-card-content>
        <p>Ingredients: {{ recipe.ingredients }}</p>
        <p>Instructions: {{ recipe.instructions }}</p>
        <p>Submitted by: {{ recipe.addedBy }}</p>
      </ion-card-content>
    </ion-card>
  `
})

export class RecipePopoverComponent {
  recipe: any;
  constructor() {}
}


