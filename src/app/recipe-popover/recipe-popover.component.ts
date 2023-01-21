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
  @Input() recipeId: string = '';
  recipe!: Recipe;
  db = firebase.firestore();
  auth = firebase.auth();
  reviewForm!: FormGroup;
  reviews!: Review[];


  constructor(private popoverController: PopoverController, private modalCtrl: ModalController, private formBuilder: FormBuilder, private firebaseService: FirebaseService,private alertController: AlertController) { }

  ngOnInit() {
    this.buildForm()
    // this.listReviews()
  }
  
  listReviews(){
    
    this.firebaseService.getReviews(this.recipeId).subscribe(reviews => {
      this.reviews = reviews;
    });
    console.log(this.reviews)
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
    

    this.firebaseService.addReview(this.recipe.id, review).then(() => {
        this.reviewForm.reset();
    });
  }
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