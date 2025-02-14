import {
  type CollectionConfig,
  type CollectionSlug
} from 'payload';

const NavigationMenu: CollectionConfig = {
  slug: 'navigation-menu',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'title for the navigation menu (i.e. Main Menu)',
      },
      required: true
    },
    {
      name: 'links',
      type: 'relationship',
      relationTo: 'nav-links' as CollectionSlug,
      hasMany: true,
      required: true
    }
  ]
}

export default NavigationMenu;