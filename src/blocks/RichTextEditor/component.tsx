import { type RichTextEditorProps } from '@/types/blockTypes'
import DOMPurify from "isomorphic-dompurify";

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content_html
}) => {
  const sanitizedContent = DOMPurify.sanitize(content_html);
  return (
    <>
      <div className='rich-text' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </>
  )
}

export default RichTextEditor