import { Component, Input } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Recipe } from '../models/recipe';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../models/review';
import { FirebaseService } from 'src/services/firebase.service';
import { RatingsAndReviewsComponent } from '../ratings-and-reviews/ratings-and-reviews.component';

const db = firebase.firestore();
const auth = firebase.auth();

@Component({
  selector: 'app-recipe-popover',
  templateUrl: './recipe-popover.component.html',
  styleUrls: ['./recipe-popover.component.scss'],
})
export class RecipePopoverComponent {
  @Input()
  recipe!: Recipe;
  db = firebase.firestore();
  auth = firebase.auth();
  reviewForm!: FormGroup;


  constructor(private popoverController: PopoverController, private modalCtrl: ModalController, private formBuilder: FormBuilder, private firebaseService: FirebaseService,private alertController: AlertController) { }

  ngOnInit() {
    this.buildForm()
  }

  addReview() {
    if (this.reviewForm.valid) {
      const user = this.auth.currentUser;
      if (!user) {
        console.log('no user try again')
        return;
      } 
    const review: Review = {
        userId: user.displayName,
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        createdAt: new Date()
    };
    if (this.reviewForm.value.rating <1 || this.reviewForm.value.rating >5){
      console.log('must be between 1 and 5')
      return
    } else{

    this.firebaseService.addReview(this.recipe.id, review).then(() => {
        this.reviewForm.reset();
    });
  }}
}



  buildForm(): void {
    this.reviewForm = this.formBuilder.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required],
    });
  }


  async showDetails(recipe: any) {
    const modal = await this.modalCtrl.create({
      component: RecipePopoverComponent,
      componentProps: { recipe },
    });
    return await modal.present();
  }



  async addToPrivateList(recipe: any) {
    try {
      const user = auth.currentUser;
      if (!user) {
        // Handle error for user not logged in
        return;
      }
      // add to user private recipe list
      const privateRecipeList = db.collection(`users/${user.uid}/privateRecipes`);
      const recipeRef = await privateRecipeList.add({
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        addedBy: recipe.userId
      });
    } catch (err) {
      console.dir(err);
      // Handle error
    }
  }
}