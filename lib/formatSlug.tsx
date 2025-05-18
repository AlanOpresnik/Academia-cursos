export const formatSlug = (slug: string) => {
    const slugFormatted = slug
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    return slugFormatted;
}