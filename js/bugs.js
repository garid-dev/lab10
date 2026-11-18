export const sumLikes = (photos) =>
  photos.reduce((total, { likes = 0 }) => total + likes, 0);

export const findPhotoById = (photos, id) =>
  photos.find((photo) => photo.id === id) ?? null;

export const searchByTitle = (photos, query) => {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return normalizedQuery
    ? photos.filter((photo) => photo.title.toLocaleLowerCase().includes(normalizedQuery))
    : [...photos];
};
