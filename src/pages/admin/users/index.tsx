import { useDeleteUserMutation, useGetUsersQuery } from "../../../api/userApi"
import { UserCard } from "../../../components/cards/user-card.component"
import { useInfo } from "../../../hooks/useInfo"
import { UserModel } from "../../../models/entities/user.model"

export const AdminUsersPage = ( ) => {

    const {data: users, isSuccess} = useGetUsersQuery(undefined)
    const [deleteUser, {isSuccess: isSuccessUserDelete, error: deleteUserError}] = useDeleteUserMutation()

    useInfo([
        {
            isSuccess: isSuccessUserDelete,
            successMessage: 'Користувача видалено',
            error: deleteUserError
        }
    ])

    
    const handleClickDeleteUser = (user: UserModel) => {
        deleteUser(user.id)
    }


    return (
        <div className="grid grid-cols-4 gap-5">
            {
                isSuccess &&
                users.map(user => (
                    <UserCard 
                        user={user}
                        onClickDelete={handleClickDeleteUser}
                    />
                ))
            }
        </div>
    )
}