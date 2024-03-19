
interface PageLabelProps {
    title: string
}

export const PageLabel = ({
    title
}: PageLabelProps) => {
  return (
    <h1 
        className="text-4xl font-prosto  first-letter:capitalize"
    >
        {title}
    </h1>
  )  
}