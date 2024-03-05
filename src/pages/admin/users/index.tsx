import { useGetUsersQuery } from "../../../api/userApi"

export const AdminUsersPage = ( ) => {

    const {data: users} = useGetUsersQuery(undefined)

    console.log(users)
    
    return (
        <div>AdminUsersPage</div>
    )
}