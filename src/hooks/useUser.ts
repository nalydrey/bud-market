import { enter, exit } from "../store/slices/user.slice"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useNavigate } from "react-router-dom"
import { LoginFormModel } from "../components/forms/LoginForm.component"
import { useLoginUserQuery } from "../api/userApi"


export const useUser = () => {

 
    const navigate = useNavigate()

    const {accessData} = useAppSelector(state => state.userReducer)

    const {data: user} = useLoginUserQuery(accessData)

    const dispatch = useAppDispatch()

    const moveToOffice = () => {
        if(user){
            user.role === 'admin' && navigate('/admin')
        }
    }

    const leaveApp = () => {
        dispatch(exit())
    }

    const enterToApp = (form: LoginFormModel) => {
        dispatch(enter(form))
    }

    console.log(user);
    

    return {
        user,
        leaveApp,
        enterToApp,
        moveToOffice
    }
}