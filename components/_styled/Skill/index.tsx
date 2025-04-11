import { SkillProps } from '@/types/general'
import Image from 'next/image'

const Skill: React.FC<SkillProps> = ({
  title,
  skillIcon,
}) => {
  const {
    alt,
    webpUrl,
  } = skillIcon
  return (
    <div className='max-w-fit'>
      <div className='z-50 bg-pillGrey px-2.5 py-2 rounded-lg w-32 h-32 lg:w-44 lg:h-44 flex flex-col justify-center items-center'>
        <div className="z-50 h-12 w-12 mx-auto">
            <Image
                width={50}
                height={50}
                src={webpUrl}
                alt={`Alex Beciana | Skill - ${alt}`}
                className="mx-auto p-0.5"
            />
        </div>
        <div
          className="mt-4 text-center dark:text-foreground"
        >
          {title}
        </div>
      </div>
    </div>
  )
}

export default Skill