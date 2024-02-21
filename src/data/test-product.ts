import { IProduct } from "../models/entities/product.model";
import pfCondor from '../assets/images/Rectangle 20.png'

export const products: IProduct[] = [
    {
        id: 1,
        brand: 'Condor',
        label: 'Новинка',
        title: 'Эмаль Condor ПФ-115 жовта 1,8 кг',
        price: [500, 700],
        status: 'у наявності',
        type: 'малярні товары',
        union: '₴',
        images: [pfCondor],
        characteristics: [
            {
                name: 'type',
                title: 'тип',
                value: 'эмаль'
            },
            {
                name: 'color',
                title: 'колір',
                value: 'жовтий'
            },
        ]
    },
    {
        id: 2,
        brand: 'Condor',
        label: 'Новинка',
        price: [500],
        title: 'Эмаль Condor ПФ-115 жовта 1,8 кг',
        status: 'у наявності',
        type: 'малярные товары',
        union: '₴',
        images: [pfCondor],
        characteristics: [
            {
                name: 'type',
                title: 'тип',
                value: 'эмаль'
            },
            {
                name: 'color',
                title: 'колір',
                value: 'жовтий'
            },
        ]
    },
]