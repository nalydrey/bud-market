
interface PageLabelProps {
    title: string
}

export const PageLabel = ({
    title
}: PageLabelProps) => {
  return (
    <h1 
        className="text-3xl font-bold first-letter:capitalize"
    >
        {title}
    </h1>
  )  
}