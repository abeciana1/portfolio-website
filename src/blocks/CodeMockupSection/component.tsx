import clsx from 'clsx'
import { type CodeMockupSectionProps } from '@/types/blockTypes'

const CodeMockupSection: React.FC<CodeMockupSectionProps> = ({
  sectionId,
  children,
  enableSection,
  background
}) => {
  return (
    <section data-testid={sectionId} id={sectionId} tabIndex={0} className="my-10 relative">
        <div className={clsx("mx-auto",{
            ["mockup-code-section"]: enableSection,
            ["bg-black text-white"]: background === "black",
            ["bg-gray-200 text-black"]: background === "gray"
        })}>
            {children}
        </div>
    </section>
  )
}

export default CodeMockupSection