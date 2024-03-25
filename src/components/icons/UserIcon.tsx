import { SVGProps } from "react"

export const UserIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg max-width="32" max-height="32" viewBox="0 0 32 32" fill="none" stroke="white" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="16" cy="16" r="15" stroke="white" strokeWidth="2"/>
            <circle cx="15.9994" cy="13.1557" r="4.68889" stroke="white" strokeWidth="2"/>
            <path d="M27.3943 26.0251C25.8375 21.2443 21.5195 17.8066 16.4364 17.8066C11.3533 17.8066 7.03533 21.2443 5.47852 26.0251"  strokeWidth="2"/>
        </svg>
    )
}