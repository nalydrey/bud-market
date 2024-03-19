import { setToken } from "../store/slices/user.slice"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useNavigate } from "react-router-dom"
import { useEnterByTokenQuery, useLoginUserMutation, userApiSlice } from "../api/userApi"
import { LoginFormModel } from "../models/forms/login-form.model"
import { useEffect } from "react"


export const useUser = () => {

 
    const navigate = useNavigate()

    const {token} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    

    const [loginUser, {data: newToken }] = useLoginUserMutation()

    const {data: user } = useEnterByTokenQuery(token)

   useEffect(() => {
    const localToken = localStorage.getItem('token')
    if(localToken) dispatch(setToken(localToken))
   }, [])
  
   useEffect(() => {
    if(newToken){
        dispatch(setToken(newToken))
        localStorage.setItem('token', newToken)
    }  
   }, [newToken])


    const moveToOffice = () => {
        if(user){
            user.role === 'admin' && navigate('/admin')
            user.role === 'user' && navigate('/user')
        }
    }

    const leaveApp = () => {
        localStorage.removeItem('token')
        dispatch(setToken(null))
        // dispatch(userApiSlice.internalActions.resetApiState())
    }

    const enterToApp = (form: LoginFormModel) => {
        loginUser(form)
    }

    const forceUser = () => {
        // refetch()
        localStorage.removeItem('token')
        dispatch(userApiSlice.internalActions.resetApiState())
        dispatch(setToken(null))
    }

    return {
        user,
        leaveApp,
        enterToApp,
        moveToOffice, 
        forceUser
    }
}