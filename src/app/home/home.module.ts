import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { HomePageRoutingModule } from './home-routing.module';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { RecipePopoverComponent } from '../recipe-popover/recipe-popover.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,ReactiveFormsModule,FormsModule
    
  
  ],
  declarations: [HomePage,AddRecipeComponent, RecipeListComponent,RecipePopoverComponent]
})
export class HomePageModule {}
