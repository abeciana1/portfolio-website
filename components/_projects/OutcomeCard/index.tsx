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
    <div>
      <div>{`${number}${numLabel}`}</div>
      <div>{label}</div>
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
      className='relative p-6 rounded-2xl  h-auto min-h-64 max-h-64 min-w-64 max-w-64 mx-auto'
    >
      <div
        className='relative z-50 opacity-100 flex flex-col justify-between h-full grow'
      >
        <div
          className='font-medium text-darkGrey dark:text-pillGrey'
        >
          {outcomeHash[resultType]}
        </div>
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
  )
}

export default OutcomeCard