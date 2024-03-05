export interface CharacteristicGroupModel {
    name: string
    payload: CharacteristicPayload[]
}

interface CharacteristicPayload {
    value: string
    unit: string | null
}