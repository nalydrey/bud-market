import { useEnterByTokenQuery, userApiSlice } from "../api/userApi"
import { setToken } from "../store/slices/user.slice"
import { useAppDispatch, useAppSelector } from "./hooks"


export const useTest = () => {

    const {token} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const { data: user } = useEnterByTokenQuery(token)


    

    

    const setTokenInState = () => {
        const t = localStorage.getItem('token')
        t && dispatch(setToken(t))
    }
   
    const removeToken = () => {
        // localStorage.removeItem('token')
        dispatch(setToken(null))
        
    }

    const force = () => {
        
        dispatch(userApiSlice.internalActions.resetApiState())
        // dispatch(setToken(null))
    }

    
    

    return {
        user,
        setToken: setTokenInState,
        removeToken,
        force
    }
}