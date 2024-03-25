import { PresentCard } from "../../components/cards/PresentCard.component"
import { presentData } from "../../data/presentSectionData"
import { CategoryPreview } from "../../components/logic-components/category-preview.component"
import { Brand } from "../../components/cards/Brand.component" 
import { RoundIconButton } from "../../components/buttons/RoundIconButton.component"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import {Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper/modules"
import 'swiper/css'
import 'swiper/css/bundle'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGetBrandsQuery } from "../../api/brandApi"
import { useGetCategoriesQuery } from "../../api/categoryApi"
import { CategoryPreviewPreloader } from "../../components/preloaders/category-preview-preloader"
import { MoveToPage } from "../../components/logic-components/move-to-page"


const gridStyles = [
    "col-span-2 row-span-2",
    "row-span-2"
]

export const HomePage = () => {

    const {data: categories, isSuccess, isError, isLoading} = useGetCategoriesQuery({page: 0})
    
    
    const navigate = useNavigate()

    const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
    const {data:brands, isSuccess: isSuccessBrands} = useGetBrandsQuery({})

    const toPrew = () => {
        swiperRef && 
        swiperRef.slidePrev()
    }
    
    const toNext= () => {
        swiperRef && 
        swiperRef.slideNext()
    }

    const handleClickCatalog = () => {
        navigate('catalog')
    }

    

    return (
        <>
            <section className=" bg-gray-dark text-white py-5">
                <div className="container mx-auto grid gap-5 grid-cols-4 grid-rows-2 h-[488px]">
                    {
                        presentData.map((data, i) => (
                            <PresentCard
                                key = {data.title}
                                title={data.title}
                                isMain={data.isMain}
                                src={data.imgUrl}
                                className={gridStyles[i]}
                                onClickCatalog={handleClickCatalog}
                            />
                        ))
                    }
                </div>
            </section>
            <section>
                <div className="container mx-auto grid grid-cols-2 gap-y-32 gap-x-10 py-20">
                    {   
                        isLoading ?
                        <>
                           <CategoryPreviewPreloader/>
                           <CategoryPreviewPreloader/>
                           <CategoryPreviewPreloader/>
                           <CategoryPreviewPreloader/>
                        </>
                        :
                        isSuccess ?
                        categories.map(category => (
                            <CategoryPreview
                                key = {category.id}
                                category={category}
                            />
                        ))
                        :
                        isError &&
                        <MoveToPage path="sww"/>
                    }
                   
                </div>
            </section>
            <section className=" bg-gray-dark text-white">
                    <h2 className="container mx-auto font-prosto text-3xl mb-6">Наші бренди</h2>
                    <div className="w-[1700px] mx-auto flex justify-center items-center gap-10">
                        <RoundIconButton
                            icon={<ChevronLeftIcon className="text-black w-6 h-6"/>}
                            onClick={  toPrew }
                        />
                        <div className="container flex justify-between gap-2">
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={30}
                            freeMode={true}
                            modules={[FreeMode]}
                            onSwiper={setSwiperRef}
                        >
                            {
                                isSuccessBrands &&
                                brands.map(brand => (
                                    <SwiperSlide>
                                         <Brand
                                            key={brand.id}
                                            src={'http://localhost:3030/'+brand.logoImg}
                                        />
                                    </SwiperSlide>
                                   
                                )) 
                            }
                        </Swiper>
                      
                        </div>
                        <RoundIconButton
                           icon={<ChevronRightIcon className="text-black w-6 h-6"/>}
                           onClick={ toNext } 
                        />
                    </div>
            </section>
        </>
    )
}