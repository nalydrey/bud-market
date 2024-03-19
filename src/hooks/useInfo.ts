import { SeverityType } from "../store/slices/info.slice"
import { useAppDispatch, useAppSelector } from "./hooks"
import { open, close } from "../store/slices/info.slice"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { SerializedError } from "@reduxjs/toolkit"
import { useEffect } from "react"

interface OpenPayload {
    message: string
    severity: SeverityType
}

interface ResponceItem {
    isSuccess: boolean
    successMessage: string
    error?: FetchBaseQueryError | SerializedError
}

export const useInfo = (resp: ResponceItem[] = []) => {

    const {message, open: status, severity} = useAppSelector(state => state.infoReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(resp){
            resp.forEach(item => {
                const {isSuccess, successMessage, error} = item
                if(isSuccess){
                    dispatch(open({message: successMessage, severity: 'success'}))
                }
                if(error){
                    if('data' in error){
                        if(typeof error.data === 'object' && error.data && 'message' in error.data && typeof error.data.message === 'string'){
                            dispatch(open({message: error.data.message, severity: 'error'}));
                        }
                    }
                    else if('error' in error){
                        dispatch(open({message: 'Щось пішло не так', severity: 'error'}));
                    }
                }
            })
        }
    }, [...resp.map(item => item.isSuccess),...resp.map(item => item.error)])

    const openInfo = (payload: OpenPayload) => {
        dispatch(open(payload))
    }

    const closeInfo = () => {
        dispatch(close())
    }

    return {
        message,
        status,
        severity,
        openInfo,
        closeInfo
    }
}