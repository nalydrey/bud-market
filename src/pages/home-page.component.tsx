import { PresentCard } from "../components/PresentCard.component"
import deValt from '../assets/devalt.jpg'
import treschetka from '../assets/treschetka.jpg'
import kraska from '../assets/kraska.jpg'
import sverla from '../assets/sverla.jpg'

interface IPresentData {
    title: string
    isMain: boolean
    imgUrl: string
}

const presentData: IPresentData[] = [
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

const gridStiles = [
    "col-span-2 row-span-2",
    "row-span-2"
]

export const HomePage = () => {
    return (
        <>
            <section className=" bg-gray-dark text-white py-5">
                <div className="container mx-auto grid gap-5 grid-cols-4 grid-rows-2 h-[488px]">
                    {
                        presentData.map((data, i) => (
                            <PresentCard
                                title={data.title}
                                isMain={data.isMain}
                                src={data.imgUrl}
                                className={gridStiles[i]}
                            />
                        ))
                    }
                    {/* <PresentCard
                        title="DeWALT - Інструмент зі справжнім характером"
                        isMain
                        src={deValt}
                        className="col-span-2 row-span-2"
                    />
                    <PresentCard
                        title=""
                        src={treschetka}
                        className="row-span-2"
                    />
                    <PresentCard
                        title="Нове надходження"
                        src={kraska}
                        className=""
                    />
                    <PresentCard
                        title="Акції на сверла"
                        src={sverla}
                        className=""
                    /> */}
                </div>
            </section>
        </>
    )
}