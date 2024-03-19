import { Outlet, useLocation } from "react-router-dom"
import { FormProvider } from "../components/logic-components/form-provider.component"
import { useInfo } from "../hooks/useInfo"
import { Info } from "../components/info.component"
import { Layout } from "../components/logic-components/layout.component"





export const IndexPage = () => {

    const {message, severity, status, closeInfo} = useInfo()
    const {pathname} = useLocation()

    const handleCloseInfo = () => {
        closeInfo()
    }

    const isShowLayout = pathname !== '/thank'
    return (
       
        <>
            {
                isShowLayout ?
                <Layout>
                    <Outlet/>
                </Layout>
                :
                <Outlet/>
            }
            <FormProvider/>
            <Info
                message = {message}
                open = {status}
                severuty = {severity}
                onClose={handleCloseInfo}
            />
        </>
    )
}