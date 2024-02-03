import { PresentCard } from "../components/PresentCard.component"
import { presentData } from "../data/presentSectionData"
import { CategoryPreview } from "../components/Category-preview.component"
import { products } from "../data/test-product"
import { Brand } from "../components/Brand.component"
import { brands } from "../data/brands"
import { RoundIconButton } from "../components/RoundIconButton.component"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

const gridStyles = [
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
                                className={gridStyles[i]}
                            />
                        ))
                    }
                </div>
            </section>
            <section>
                <div className="container mx-auto grid grid-cols-2 gap-y-32 gap-x-10 py-20">
                    <CategoryPreview
                        title="Малярні товари"
                        products={products}
                    />
                    <CategoryPreview
                        title="Малярні товари"
                        products={products}
                    />
                    <CategoryPreview
                        title="Малярні товари"
                        products={products}
                    />
                    <CategoryPreview
                        title="Малярні товари"
                        products={products}
                    />
                    <CategoryPreview
                        title="Малярні товари"
                        products={products}
                    />
                    <CategoryPreview
                        title="Малярні товари"
                        products={products}
                    />
                </div>
            </section>
            <section className=" bg-gray-dark text-white">
                    <h2 className="container mx-auto font-prosto text-3xl mb-6">Наші бренди</h2>
                    <div className="w-[1700px] mx-auto flex justify-center items-center gap-10">
                        <RoundIconButton
                            icon={<ChevronLeftIcon className="text-black w-6 h-6"/>}
                        />
                        <div className="container flex justify-between">
                            {
                                brands.map(brand => (
                                    <Brand
                                        key={brand.id}
                                        src={brand.logo}
                                    />
                                )) 
                            }
                        </div>
                        <RoundIconButton
                           icon={<ChevronRightIcon className="text-black w-6 h-6"/>} 
                        />
                    </div>
            </section>
        </>
    )
}