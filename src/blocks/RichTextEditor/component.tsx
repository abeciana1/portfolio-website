import { type RichTextEditorProps } from '@/types/blockTypes'
import DOMPurify from 'isomorphic-dompurify'
import '@/styles/html-styles.css'

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const { content_html } = props
  const sanitizedContent = DOMPurify.sanitize(content_html)
  return (
    <>
      <div data-cursor-variant="callToAction" data-cursor-pointer="text" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </>
  )
}

export default RichTextEditor
