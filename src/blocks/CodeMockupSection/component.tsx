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
          {!useRandomData && <RenderBlocks blocks={[...code] as any} />}
        </div>
    </section>
  )
}

export default CodeMockupSection