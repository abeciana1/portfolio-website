import { type InsightProps } from '@/types/blockTypes'

const Insight: React.FC<InsightProps> = ({
  title,
  body
}) => {
  return (
    <li className='space-y-1'>
      <div
        data-cursor-pointer='text'
        data-testid='insight-title'
        className='text-darkGrey dark:text-pillGrey text-2xl font-semibold'
      >
        {title}
      </div>
      <div
        data-testid='insight-body'
        className='text-xl font-medium'
      >
        {body}
      </div>
    </li>
  )
}

export default Insight