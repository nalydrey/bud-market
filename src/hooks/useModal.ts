import { useState } from "react"

export const useModal = () => {

    const [status, setStatus] = useState<boolean>(false)

    const open = () => {
        setStatus(true)
    }

    const close = () => {
        setStatus(false)
    }

    return {
        status,
        open,
        close,
        setStatus
    }
}