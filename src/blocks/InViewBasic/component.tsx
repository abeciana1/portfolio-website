import { type InViewBasicProps } from '@/types/blockTypes'
import { InView } from '@/components/_core/InView'

const InViewBasic: React.FC<InViewBasicProps> = ({
  title,
  description,
  hiddenY,
  hiddenBlur,
  visibleY,
  visibleBlur,
}) => {
  return (
    <div className="h-[350px] w-full overflow-auto">
      <div className="flex h-fit items-end justify-center px-4 pb-24">
        <InView
          variants={{
            hidden: { opacity: 0, y: hiddenY, filter: `blur(${hiddenBlur}px)` },
            visible: { opacity: 1, y: visibleY, filter: `blur(${visibleBlur}px)` },
          }}
          viewOptions={{ margin: '0px 0px -200px 0px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div data-cursor-variant="callToAction" data-cursor-pointer="text" className="max-w-96">
            <p>
              <strong>{title}</strong> {description}
            </p>
          </div>
        </InView>
      </div>
    </div>
  )
}

export default InViewBasic
