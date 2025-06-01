import { type InsightProps } from '@/types/blockTypes'

const Insight: React.FC<InsightProps> = ({
  title,
  body
}) => {
  return (
    <li>
      <div data-testid='insight-title'>{title}</div>
      <div data-testid='insight-body'>{body}</div>
    </li>
  )
}

export default Insight