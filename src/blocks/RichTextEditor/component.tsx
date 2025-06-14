import { type RichTextEditorProps } from '@/types/blockTypes'
import DOMPurify from 'isomorphic-dompurify'

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const { content_html } = props
  const sanitizedContent = DOMPurify.sanitize(content_html)
  return (
    <>
      <div className="rich-text space-y-3" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </>
  )
}

export default RichTextEditor
