import { ProductModel } from "../entities/product.model";

export interface ProductsResponce {
    products: ProductModel[]
    qty: number
}