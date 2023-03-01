import { Review } from "./review";

export class Recipe {
    id!: any;
    name: string='';
    ingredients: string='';
    instructions: string='';
    userId!: any;
    createdAt!: Date;
    rating: number = 0;
    reviews: Review[] = [];   
    image: string = 'default-image-url'; // default image url
}