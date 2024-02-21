import { PhotoModel } from "./photo.model"

export interface CategoryModel {
    id: number,
    systemName: string,
    name: string,
    photo: null | PhotoModel
    children: CategoryModel[]
}