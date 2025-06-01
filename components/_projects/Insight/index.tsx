import { type InsightProps } from '@/types/blockTypes'

const Insight: React.FC<InsightProps> = ({
  title,
  body
}) => {
  return (
    <li>
      <div>{title}</div>
      <div>{body}</div>
    </li>
  )
}

export default Insight