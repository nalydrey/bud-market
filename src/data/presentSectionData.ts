import deValt from '../assets/devalt.jpg'
import treschetka from '../assets/treschetka.jpg'
import kraska from '../assets/kraska.jpg'
import sverla from '../assets/sverla.jpg'

interface IPresentData {
    title: string
    isMain: boolean
    imgUrl: string
}

export const presentData: IPresentData[] = [
    {
        title: 'DeWALT - Інструмент зі справжнім характером',
        isMain: true,
        imgUrl: deValt
    },
    {
        title: 'Акції',
        isMain: false,
        imgUrl: treschetka
    },
    {
        title: 'Нове надходження',
        isMain: false,
        imgUrl: kraska
    },
    {
        title: 'Акції на сверла',
        isMain: false,
        imgUrl: sverla
    },
]