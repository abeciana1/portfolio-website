import {
  type CollectionConfig
} from 'payload';

export const Test: CollectionConfig = { 
  slug: 'test',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    }
  ]
}