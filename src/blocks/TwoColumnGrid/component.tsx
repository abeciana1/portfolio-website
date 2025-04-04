/* eslint-disable @typescript-eslint/no-explicit-any */
import { type TwoColumnGridProps } from '@/types/blockTypes'
import RenderBlocks from '@/src/blocks/RenderBlocks'
import '@/styles/html-styles.css'
import clsx from 'clsx'

const TwoColumnGrid: React.FC<TwoColumnGridProps> = ({
  sectionId,
  column1,
  column2,
  reverseOrder,
  vertAlignment = 'middle'
}) => {
  return (
    <section
      data-testid={sectionId}
      id={sectionId}
      className={clsx("relative xl:gap-40 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:px-10 lg:py-24 px-5 py-10 place-content-between", {
        ['items-center']: vertAlignment === 'middle',
        ['items-start']: vertAlignment === 'top',
        ['items-end']: vertAlignment === 'bottom',
      })}
    >
      {reverseOrder ?
        <RenderBlocks blocks={[...column2,...column1] as any} /> :
        <RenderBlocks blocks={[...column1,...column2] as any} />  // Reverse order of columns if enabled.  // Render blocks in the order provided in the array.  // The order of the columns can be reversed by enabling the reverseOrder prop.  // Note: This will not work correctly with blocks that require specific order (like hero-section or in-view-basic).  // For those blocks, you should manually handle the reordering in your RenderBlocks component.  // Alternatively
      }
    </section>
  )
}

export default TwoColumnGrid