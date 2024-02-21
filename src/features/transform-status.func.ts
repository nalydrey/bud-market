

type TransormStatusFunc = (status: string) => {
    color: string
    title: string
} 

export const transformStatus: TransormStatusFunc = (status)  => {
    switch(status){
        case 'exist': return {
            color: '#126935',
            title: 'в наявності'
        } 
        case 'none': return {
            color: 'red',
            title: 'нема у наявності'
        }
        case 'order': return {
            color: '#FC573B',
            title: 'під замовлення'
        }
        default: return {
            color: '#fff',
            title: 'невідомо'
        }
    }
}