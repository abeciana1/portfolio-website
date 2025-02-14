import { type CollectionConfig } from 'payload';

const NavLinks: CollectionConfig = {
  slug: 'nav-links',
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

export default NavLinks;