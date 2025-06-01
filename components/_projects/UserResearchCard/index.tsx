import { type UserResearchCardProps } from '@/types/blockTypes'
import { AnimatedNumber } from '@/components/motion-primitives/animated-number'

const researchTypeHash = {
  survey: 'survey responses',
  interviews: 'in-depth interviews',
  usability: 'usability tests',
  accessibility: 'WCAG 2.1 compliance audits'
}

const emojiHash = {
  survey: '📝',
  interviews: '🗣️',
  usability: '👩‍💻',
  accessibility: '🌐'
}

const UserResearchCard: React.FC<UserResearchCardProps> = ({
  researchType,
  numberMetric
}) => {
  return (
    <div
      className='relative p-6 rounded-2xl bg-background/50 dark:bg-foreground/50 h-auto min-h-64 max-h-64 min-w-64 max-w-64 mx-auto'
    >
      <div className='relative z-50 opacity-100 flex flex-col justify-between h-full grow'>
        <div
          className='relative'
          data-testid='usability-header'
        >
          <div className='font-medium text-4xl'>{emojiHash[researchType] as string}</div>
        </div>
        <div className='relative' data-testid='metrics'>
          <AnimatedNumber
            className='items-center text-3xl font-bold text-foreground dark:text-zinc-50'
            springOptions={{
              bounce: 0,
              duration: 10000,
            }}
            value={numberMetric}
          />
          <div className='font-medium text-xl min-h-[3rem] leading-tight'>{researchTypeHash[researchType]}</div>
        </div>
      </div>
    </div>
  )
}

export default UserResearchCard