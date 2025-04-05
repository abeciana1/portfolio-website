/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { type CodeMockupSectionProps } from '@/types/blockTypes'
import jokes from '@/data/jokes.json'
import CodeMockupLine from '@/src/blocks/CodeMockupLine/component'
import '@/styles/code-highlight.css'
import RenderBlocks from '@/src/blocks/RenderBlocks'

const CodeMockupSection: React.FC<CodeMockupSectionProps> = ({
  sectionId,
  code,
  enableSection,
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
        <div className={clsx("mx-auto dark:border-2 bg-foreground text-background dark:border-background",{
            ["mockup-code-section"]: enableSection,
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
          {(!useRandomData && code) && <RenderBlocks blocks={[...code] as any} />}
        </div>
    </section>
  )
}

export default CodeMockupSection