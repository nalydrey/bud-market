
interface CounterProps {
    className?: string
    value: number
}

export const Counter = ({
    className,
    value
}: CounterProps) => {
    return (
        <div className={`bg-orange-secondary rounded-3xl text-xs px-[6px] py-[3px] ${className}`}>
            {value}
        </div>
    )
}