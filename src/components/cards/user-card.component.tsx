import { UserModel } from "../../models/entities/user.model"

interface UserCardProps {
    user: UserModel
    onClickDelete?: (user: UserModel) => void
}

export const UserCard = ({
    user,
    onClickDelete
}: UserCardProps) => {


    const {id, firstName, lastName, phone, role} = user

    const handleClickDelete = () => {
        onClickDelete && onClickDelete(user)
    }

    return (
        <div className=" border">
            <div>{id}</div>
            <div>{firstName}</div>
            <div>{lastName}</div>
            <div>{phone}</div>
            <div>{role}</div>
            <button 
                className="border p-1 bg-gray-300 hover:bg-gray-400"
                onClick={handleClickDelete}
            >delete</button>
        </div>
    )
}