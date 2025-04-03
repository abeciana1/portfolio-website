import clsx from 'clsx'
import { type CodeMockupLineProps } from '@/types/blockTypes'

const CodeMockupLine: React.FC<CodeMockupLineProps> = ({
  text,
  prefix,
  textColor,
}) => {
  return (
      <pre data-prefix={prefix} className={clsx("flex font-bold", {
          ["text-black"]: textColor === "black",
          ["text-white"]: textColor === "white",
          ["text-green-400"]: textColor === "success",
          ["text-[#F7B538]"]: textColor === "warning"
      })}>
          <code className="whitespace-normal font-bold">
              {text}
          </code>
      </pre>
  )
}

export default CodeMockupLine