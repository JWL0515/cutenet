import { DogBrand } from "./dogBrand.type";
import { DogCategory } from "./dogCategory.type";

export interface DogProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    productCategory: DogCategory;
    productBrand: DogBrand;
}