import {
  type OutcomeProps,
  type OutcomeStatProps
} from '@/types/blockTypes'

const outcomeHash = {
  'adoption': 'Adoption',
  'retention': 'Retention',
  'efficiency': 'Efficiency'
}

const OutcomeStat: React.FC<OutcomeStatProps> = ({
  number,
  label,
  numLabel
}) => {
  return(
    <div className='h-40'>
      <div data-testid='number-stat' className='font-semibold text-3xl'>{`${number}${numLabel}`}</div>
      <div data-testid='stat-label' className='font-medium text-lg'>{label}</div>
    </div>
  )
}

const OutcomeCard: React.FC<OutcomeProps> = ({
  resultType,
  emojis,
  stats
}) => {

  return (
    <div
      className='relative p-6 rounded-2xl bg-background dark:bg-darkGrey h-auto min-h-80 max-h-80 min-w-64 max-w-64 mx-auto shadow-xl'
    >
      <div
        className='relative z-50 opacity-100 flex flex-col justify-between h-full grow'
      >
        <div
          data-testid='result-type'
          className='font-medium text-darkGrey/70 dark:text-pillGrey'
        >
          {outcomeHash[resultType]}
        </div>
        <div
          data-testid='emojis'
          className='font-medium text-2xl min-h-8'
        >
          {emojis}
        </div>
        <div>
          {stats?.map((stat, index) => {
            return (
              <OutcomeStat
                key={`${stat.label}-${index}`}
                label={stat?.label}
                number={stat?.number}
                numLabel ={stat?.numLabel}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OutcomeCard