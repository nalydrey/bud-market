export interface CategoryModel {
    id: number,
    systemName: string,
    name: string,
    children: CategoryModel[]
}