import {
  type Block,
} from 'payload';

export const CodeBlock: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'code',
      label: 'Code',
      type: 'code',
      required: true,
    },
    {
      name: 'language',
      label: 'Language',
      type: 'select',
      defaultValue: 'bash',
      options: [
        { label: 'Bash', value: 'bash' },
        { label: 'CSS', value: 'css' },
        { label: 'HTML', value: 'html' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'JSON', value: 'json' },
        { label: 'Markdown', value: 'markdown' },
        { label: 'Python', value: 'python' },
        { label: 'SQL', value: 'sql' },
        { label: 'YAML', value: 'yaml' },
        { label: 'TypeScript', value: 'typescript' }
      ]
    }
  ],
};