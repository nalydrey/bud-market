import { useEffect, useState } from "react"
import { ModalWindow } from "./modal-window.component"
import { FormContainer } from "./form-container.component"
import { Alert, Snackbar } from "@mui/material"

interface ModalProviderItem {
    name: string
    open: boolean
    child: JSX.Element
}


interface ModalProviderProps {
    isLoading?: boolean
    openedList: string[]
    children: JSX.Element | JSX.Element[]
    onClickEmptySpace?: (name: string) => void
    onClose?: (name: string) => void
}

export const ModalProvider = ({
    openedList,
    isLoading,
    children,
    onClose,
    onClickEmptySpace
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

    const handleClickEmptySpace = (name: string) => {
        onClickEmptySpace && onClickEmptySpace(name)
    }


    return (
        <>
            
             {
                state.map((item) => {
                    return (
                        <ModalWindow
                            open = {item.open}
                            onClickEmptySpace={() => handleClickEmptySpace(item.name)}
                        >
                            <FormContainer
                                isLoading = {isLoading}
                                onClose={() => handleClose(item.name)}
                            >
                                {item.child}
                            </FormContainer>
                        </ModalWindow>
                    )
                })
            }
        </>
       
    )
}