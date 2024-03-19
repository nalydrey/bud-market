import { StatusModel } from "../models/entities/status.model";

export const statuses: StatusModel[] = [
    {
        systemName: 'exist',
        label: 'В наявності',
        color: '#'
    },
    {
        systemName: 'order',
        label: 'на замовлення',
        color: '#'
    },
    {
        systemName: 'none',
        label: 'немає у наявності',
        color: '#'
    }
]