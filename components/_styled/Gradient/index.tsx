import { type GradientProps } from '@/types/general'
import clsx from 'clsx'

const gradients = {
  "Variant1": {
    default: {
      first: 'bg-gradient-to-b from-[#FC50B7] to-[#FFC56F]/50',
      second: 'bg-gradient-to-b from-[#FF08AB] via-[#F58A25]/0 to-[#7061A3]/0'
    },
    xFlip: {
      first: 'bg-gradient-to-r from-[#FC50B7] to-[#FFC56F]/50',
      second: 'bg-gradient-to-r from-[#FF08AB] via-[#F58A25]/0 to-[#7061A3]/0'
    },
    bothFlip: {
      first: 'bg-gradient-to-t from-[#FFC56F]/50 to-[#FC50B7] scale-x-[-1] scale-y-[-1]',
      second: 'bg-gradient-to-t from-[#7061A3]/0 via-[#F58A25]/0 to-[#FF08AB] scale-x-[-1] scale-y-[-1]'
    },
    yFlip: {
      first: 'bg-gradient-to-t from-[#FC50B7] to-[#FFC56F]/50',
      second: 'bg-gradient-to-t from-[#FF08AB] via-[#F58A25]/0 to-[#7061A3]/0'
    }
  },
  "Variant2": {
    default: {
      first: 'bg-gradient-to-b from-[#00C2FF]/50 to-[#FF008A]/30',
      second: 'bg-gradient-to-b from-[#00C2FF]/45 to-[#B40463]'
    },
    xFlip: {
      first: 'bg-gradient-to-r from-[#00C2FF]/50 to-[#FF008A]/30',
      second: 'bg-gradient-to-r from-[#00C2FF]/45 to-[#B40463]'
    },
    yFlip: {
      first: 'bg-gradient-to-t from-[#00C2FF]/50 to-[#FF008A]/30',
      second: 'bg-gradient-to-t from-[#00C2FF]/45 to-[#B40463]'
    },
    bothFlip: {
      first: 'bg-gradient-to-t from-[#00C2FF]/50 to-[#FF008A]/30 scale-x-[-1] scale-y-[-1]',
      second: 'bg-gradient-to-t from-[#00C2FF]/45 to-[#B40463] scale-x-[-1] scale-y-[-1]'
    }
  },
  "Variant3": {
    default: {
      first: 'bg-gradient-to-t from-[#FA0D3F] to-[#85357E]/0',
      second: 'bg-gradient-to-b from-[#FB0A3F] to-[#F9A641]/55'
    },
    xFlip: {
      first: 'bg-gradient-to-l from-[#FA0D3F] to-[#85357E]/0',
      second: 'bg-gradient-to-l from-[#FB0A3F] to-[#F9A641]/55'
    },
    yFlip: {
      first: 'bg-gradient-to-b from-[#FA0D3F] to-[#85357E]/0',
      second: 'bg-gradient-to-t from-[#FB0A3F] to-[#F9A641]/55'
    },
    bothFlip: {
      first: 'bg-gradient-to-b from-[#FA0D3F] to-[#85357E]/0 scale-x-[-1] scale-y-[-1]',
      second: 'bg-gradient-to-t from-[#FB0A3F] to-[#F9A641]/55 scale-x-[-1] scale-y-[-1]'
    }
  },
  "Variant4": {
    default: {
      first: 'bg-gradient-to-b from-[#0009D5]/65 to-[#64FFB2]',
      second: 'bg-gradient-to-b from-[#9900BF]/28 to-[#004EE4]/52',
    },
    xFlip: {
      first: 'bg-gradient-to-r from-[#0009D5]/65 to-[#64FFB2]',
      second: 'bg-gradient-to-r from-[#9900BF]/28 to-[#004EE4]/52'
    },
    yFlip: {
      first: 'bg-gradient-to-t from-[#0009D5]/65 to-[#64FFB2]',
      second: 'bg-gradient-to-t from-[#9900BF]/28 to-[#004EE4]/52'
    },
    bothFlip: {
      first: 'bg-gradient-to-t from-[#0009D5]/65 to-[#64FFB2] scale-x-[-1] scale-y-[-1]',
      second: 'bg-gradient-to-t from-[#9900BF]/28 to-[#004EE4]/52 scale-x-[-1] scale-y-[-1]',
    }
  }
}

const Gradient: React.FC<GradientProps> = ({
  variant = 'Variant1',
  gradientXFlip,
  gradientYFlip
}) => {
  return (
    <div className='absolute top-5.5 left-0 w-full h-full'>
      <div
        style={{
          height: '100%',
          width: '100%'
        }}
        className={clsx('absolute z-40 rounded-full blur-3xl',{
          [gradients[variant]["default"]["first"]]: !gradientXFlip && !gradientYFlip,
          [gradients[variant]["xFlip"]["first"]]: gradientXFlip && !gradientYFlip,
          [gradients[variant]["yFlip"]["first"]]: !gradientXFlip && gradientYFlip,
          [gradients[variant]["bothFlip"]["first"]]: gradientXFlip && gradientYFlip,
        })}
      />
      <div
        style={{
          height: '100%',
          width: '100%'
        }}
        className={clsx('absolute z-30 rounded-full blur-2xl',{
          [gradients[variant]["default"]["second"]]: !gradientXFlip && !gradientYFlip,
          [gradients[variant]["xFlip"]["second"]]: gradientXFlip && !gradientYFlip,
          [gradients[variant]["yFlip"]["second"]]: !gradientXFlip && gradientYFlip,
          [gradients[variant]["bothFlip"]["second"]]: gradientXFlip && gradientYFlip,
        })}
      />
    </div>
  )
}

export default Gradient