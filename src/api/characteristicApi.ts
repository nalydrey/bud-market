import { CharacteristicGroupModel } from "../models/entities/characteristic-group.model";
import { CharacteristicModel } from "../models/entities/characteristic.model";
import { CharacteristicGroupResponce } from "../models/response/characteristic-group-responce.model";
import { CharacteristicsResponce } from "../models/response/characteristics-responce.model";
import { mainApi } from "./createApi";

export const characteristicApiSlice = mainApi.injectEndpoints({
    endpoints: builder => ({

        getCharacteristics: builder.query<CharacteristicModel[], undefined>({
            query: () => '/characteristics/many',
            transformResponse: (responce: CharacteristicsResponce) => responce.characteristics
        }),
        
        getCharacteristicsGroup: builder.query<CharacteristicGroupModel[], string>({
            providesTags: ['Characteristics'],
            query: (categorySystemName) => `/characteristics/group/${categorySystemName}`,
            transformResponse: (responce: CharacteristicGroupResponce) => {
                const set = new Set(responce.characteristicGroups.map(item => item.name))
                const uniqNames = Array.from(set)
                
                return uniqNames.map(uniqName => {
                    const items = responce.characteristicGroups.filter(characteristic => characteristic.name === uniqName)
                    return {
                        name: uniqName,
                        payload: items.map(item => ({
                            value: item.value,
                            unit: item.unit
                        }))
                    }
                })
            } 
        })
    })
})

export const { 
    useGetCharacteristicsQuery,
    useGetCharacteristicsGroupQuery
} = characteristicApiSlice