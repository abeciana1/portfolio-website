
type PillProps = {
  text: string;
}

const Pill: React.FC<PillProps> = ({
  text
}) => {
  return (
    <div
      className="text-foreground bg-pillGrey rounded-lg py-1 px-2 text-center font-medium max-w-fit mx-auto text-lg"
    >{text}</div>
  )
}

export default Pill