import { Alert, Snackbar } from "@mui/material"
import { SeverityType } from "../store/slices/info.slice"

interface InfoProps {
    open: boolean
    severuty: SeverityType
    message: string
    onClose?: () => void
}

export const Info = ({
    open,
    message,
    severuty,
    onClose,
}: InfoProps) => {


    const handleCloseSnack = () => {
        onClose && onClose()
    }

    return (
        <Snackbar
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleCloseSnack}
        >
            <Alert
                onClose={handleCloseSnack}
                severity={severuty}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar> 
    )
}