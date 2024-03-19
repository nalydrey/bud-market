import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

export const isFetchBaseQueryError = (error: object): error is FetchBaseQueryError   => {

    return  error && 
            'data' in error
    
}