import { type Field } from 'payload'

export const NestedRoute: Field = {
  interfaceName: 'NestedRouteField',
  name: 'nestedRoute',
  label: 'Nested Route',
  type: 'select',
  required: true,
  options: [
    {
      label: 'Base',
      value: 'base'
    },
    {
      label: 'Projects',
      value: 'projects'
    },
    {
      label: 'Blog',
      value: 'blog'
    }
  ]
}