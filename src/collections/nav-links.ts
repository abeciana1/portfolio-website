import { type CollectionConfig } from 'payload';

const NavLinks: CollectionConfig = {
  slug: 'nav-links',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      required: true,
    }
  ]
}

export default NavLinks;