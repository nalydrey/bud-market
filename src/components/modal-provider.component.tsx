import { useEffect, useState } from "react"
import { ModalWindow } from "./modal-window.component"

interface ModalProviderItem {
    name: string
    open: boolean
    child: JSX.Element
}


interface ModalProviderProps {
    openedList: string[]
    children: JSX.Element | JSX.Element[]
    onClose?: (name: string) => void
}

export const ModalProvider = ({
    openedList,
    children,
    onClose
}: ModalProviderProps) => {


    const [state, setState] = useState<ModalProviderItem[]>([])

    useEffect(()=>{
        
        const arr = !Array.isArray(children) ? [children] : children

        const initState: ModalProviderItem[] = arr.map(child =>{
            const {name} = child.props
            return ({
            child: child,
            name,
            open: openedList.includes(name)
        })
        } )

        setState(initState)
    }, [openedList])

    
    console.log(state);
    
    

    const handleClose = (name: string) => {
        onClose && onClose(name)
    }


    return (
        <>
            
             {
                state.map((item) => {
                    return (
                        <>
                        {
                            item.open &&
                            <ModalWindow
                                onClickEmptySpace={() => handleClose(item.name)}
                            >
                                {item.child}
                            </ModalWindow>
                        }
                        </>    
                    )
                })
            }
        </>
       
    )
}