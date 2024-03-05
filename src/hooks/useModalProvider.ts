import { useState } from "react"

export const useModalProvider = () => {

    const [openedList, setOpenedList] = useState<string[]>([])

    const open = (name: string) => {
        if(!openedList.includes(name))
        setOpenedList([...openedList, name])
    }

    const close = (name: string) => {
        setOpenedList(
            openedList.filter(item => item !== name)
        )
    }

    return ({
        openedList,
        open,
        close
    })
}