import clsx from 'clsx'
import { type CodeMockupSectionProps } from '@/types/blockTypes'
import jokes from '@/data/jokes.json'
import CodeMockupLine from '@/src/blocks/CodeMockupLine/component'
import '@/styles/code-highlight.css'

const CodeMockupSection: React.FC<CodeMockupSectionProps> = ({
  sectionId,
  children,
  enableSection,
  background,
  useRandomData
}) => {
  const joke = jokes[Math.floor(Math.random()*jokes.length)]


  return (
    <section
      data-testid={sectionId}
      id={sectionId}
      tabIndex={0}
      className="relative"
    >
        <div className={clsx("mx-auto",{
            ["mockup-code-section"]: enableSection,
            ["bg-foreground text-white"]: background === "black",
            ["bg-gray-200 text-foreground"]: background === "gray"
        })}>
          {useRandomData &&
            <>
              <CodeMockupLine
                prefix="$"
                textColor="warning"
                text={joke?.question}
              />
              <CodeMockupLine
                prefix=">"
                textColor="success"
                text={joke?.punchline}
              />
            </>
          }
          {!useRandomData && children}
        </div>
    </section>
  )
}

export default CodeMockupSection