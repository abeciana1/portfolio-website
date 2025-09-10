type PillProps = {
  text: string
}

const Pill: React.FC<PillProps> = ({ text }) => {
  return (
    <div
      data-cursor-variant="callToAction"
      data-cursor-pointer="text"
      className="text-foreground bg-pillGrey rounded-lg py-1 px-2 text-center font-medium max-w-fit text-lg"
    >
      {text}
    </div>
  )
}

export default Pill
