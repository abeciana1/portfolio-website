import { SkillProps } from '@/types/general'
import Image from 'next/image'

const Skill: React.FC<SkillProps> = ({
  title,
  skillIcon,
}) => {
  console.log('title', title)
  const {
    alt,
    webpUrl,
  } = skillIcon
  return (
    <div>
      <div className="h-12 w-12 mx-auto">
          <Image
              width={50}
              height={50}
              src={webpUrl}
              alt={`Alex Beciana | Skill - ${alt}`}
              className="mx-auto dark:bg-background p-0.5"
          />
      </div>
      <div
        className="mt-4 text-center"
      >
        {title}
      </div>
  </div>
  )
}

export default Skill