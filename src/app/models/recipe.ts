import { Review } from "./review";

export class Recipe {
    id: string='';
    name: string='';
    ingredients: string='';
    instructions: string='';
    userId!: string;
    createdAt!: Date;
    rating: number = 0;
    reviews: Review[] = [];
}