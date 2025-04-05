
type PillProps = {
  text: string;
}

const Pill: React.FC<PillProps> = ({
  text
}) => {
  return (
    <div
      className="text-foreground bg-pillGrey rounded-lg"
    >{text}</div>
  )
}

export default Pill