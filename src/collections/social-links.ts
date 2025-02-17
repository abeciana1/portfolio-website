import { type CollectionConfig } from 'payload';

const SocialLinks: CollectionConfig = {
  slug: 'social-links',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
      type: 'text'
    },
    {
      name: 'link',
      type: 'text'
    }
  ]
}

export default SocialLinks;