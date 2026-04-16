export function slugify(text: string): string {
  if (!text) return '';
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars (except spaces and dashes)
    .replace(/[\s_-]+/g, '-')   // Replace spaces and underscores with a single dash
    .replace(/^-+|-+$/g, '');   // Remove leading/trailing dashes
}
