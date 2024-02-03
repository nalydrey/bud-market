export interface IProduct {
    id: number
    title: string
    name: string
    brand: string
    model: string
    discription: string
    category: string
    rating: number
    characteristics: ICharacteristic[]
    viewCounter: number
    photos: string[]
    priceHistory: number[]
    label: string
    status: string
}

export interface ICharacteristic {
    name: string
    title: string
    unit: string | null
    value: string
}