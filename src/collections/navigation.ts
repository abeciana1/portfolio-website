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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'links',
      type: 'relationship',
      relationTo: 'nav-links' as CollectionSlug,
      hasMany: true,
      required: true
    },
    {
      name: 'socialLinks',
      type: 'relationship',
      relationTo:'social-links' as CollectionSlug,
      hasMany: true,
    }
  ]
}

export default NavigationMenu;