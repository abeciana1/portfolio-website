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
    <div className='relative'>
        <Image
          src={webpUrl}
          alt={alt}
          height={50}
          width={50}
        />
        <div>{title}</div>
    </div>
  )
}

export default Skill