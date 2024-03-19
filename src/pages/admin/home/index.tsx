import { useModalProvider } from "../../../hooks/useModalProvider"
import { CreateButton } from "../../../components/buttons/CreateButton.component"

interface CreateButton {
    name: string
    title: string
}

const buttons: CreateButton[] = [
    {
        name: 'brand',
        title: 'Створити бренд'
    },
    {
        name: 'label',
        title: 'Створити мітку'
    },
    {
        name: 'category',
        title: 'Створити категорію'
    },
    {
        name: 'product',
        title: 'Створити продукт'
    },
]

export const AdminHomePage = () => {

    const {open} = useModalProvider()

    return (
        <div className="flex gap-3">
            {
                buttons.map(button => (
                    <CreateButton
                        key={button.name}
                        title={button.title}
                        name={button.name}
                        onClick={open}
                    />
                ))
            }
        </div>
    )
}