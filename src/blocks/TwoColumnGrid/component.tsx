import { type TwoColumnGridProps } from '@/types/blockTypes'

const TwoColumnGrid: React.FC<TwoColumnGridProps> = ({
  sectionId,
  column1,
  column2,
  reverseOrder,
}) => {
  return (
    <section
      data-testid={sectionId}
      id={sectionId}
      className="grid grid-cols-1 md:grid-cols-2 gap-10"
    >
      {reverseOrder ? [...column2,...column1] : [...column1,...column2]}
    </section>
  )
}

export default TwoColumnGrid