import { closeModal, openModal } from "../store/slices/modal.slice"
import { useAppDispatch, useAppSelector } from "./hooks"

export const useModalProvider = () => {

    const {openedList} = useAppSelector(state => state.modalReducer)

    const dispatch = useAppDispatch()

    const open = (name: string) => {
        dispatch(openModal(name))
    }

    const close = (name: string) => {
        dispatch(closeModal(name))
    }

    return ({
        openedList,
        open,
        close
    })
}