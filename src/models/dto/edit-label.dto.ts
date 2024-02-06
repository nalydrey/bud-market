import { LabelModel } from "../entities/label.model";

export interface EditLabelDto {
    id: number
    name?: string
    color?: string
}