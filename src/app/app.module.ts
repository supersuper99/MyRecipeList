import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { initializeApp } from "firebase/app";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipePopoverComponent } from './recipe-popover/recipe-popover.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';



@NgModule({
  declarations: [AppComponent, RecipeDetailComponent, ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule,FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  exports:[ReactiveFormsModule,FormsModule]
})
export class AppModule {
  constructor() {
    firebase.initializeApp(environment.firebase)
  }
}
