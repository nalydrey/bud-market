import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


interface MoveToPageProps {
    path: string
}


export const MoveToPage = ({
    path
}: MoveToPageProps) => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate(path)
    }, [])

    return (
        <div></div>
    )
}