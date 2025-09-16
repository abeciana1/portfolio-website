import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import '@/styles/notion-code.css'
import { type CodeBlockProps } from '@/types/blockTypes'
import clsx from 'clsx'

const Code: React.FC<CodeBlockProps> = ({
  code = '',
  language = ''
}) => {
  if (!code) return null
  return (
    <section className='my-6'>
      <SyntaxHighlighter language={language} className={clsx('notion-code')}>
        { code }
      </SyntaxHighlighter>
    </section>
  )
}

export default Code