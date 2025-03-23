export const titleToSlug = (title: string) => {
  return title
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase(); 
}

export const innerContainer = 'lg:px-20 lg:py-12 px-5 py-5'

export const limitContainer = 'py-5 px-5 md:px-10 lg:py-12 md:justify-between'