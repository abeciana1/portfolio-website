import { type Field } from 'payload'

export const NestedRoute: Field = {
  interfaceName: 'NestedRouteField',
  name: 'nestedRoute',
  label: 'Nested Route',
  type: 'select',
  options: [
    {
      label: 'Base',
      value: 'base'
    },
    {
      label: 'Projects',
      value: 'projects'
    }
  ]
}