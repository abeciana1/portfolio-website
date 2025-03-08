export const titleToSlug = (title: string) => {
  return title
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase(); 
}