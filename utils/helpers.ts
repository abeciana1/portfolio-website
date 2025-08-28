export const titleToSlug = (title: string) => {
  return title
    .replace(/[()]/g, '') // remove parentheses
    .replace(/([a-z])([A-Z])/g, '$1 $2') // add space between camelCase
    .replace(/[\s_]+/g, '-') // replace spaces/underscores with hyphen
    .replace(/[^a-z0-9-]/gi, '') // remove everything not alphanumeric or hyphen
    .toLowerCase();
};

export const innerContainer = 'lg:px-20 lg:py-12 md:px-10 px-5 py-5'

export const limitContainer = 'py-5 px-5 md:px-10 lg:py-24 md:justify-between'

export const sectionContainer = 'py-12 px-5 md:px-10 lg:py-24'