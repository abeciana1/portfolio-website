import { type Block } from 'payload';
import { Job } from '@/src/blocks/Job/config'

export const JobSection: Block = {
  slug: 'job-section-block',
  interfaceName: 'JobSectionBlock',
  fields: [
    {
      name: 'jobs',
      label: 'jobs',
      type: 'blocks',
      blocks: [
        Job
      ]
    }
  ]
}