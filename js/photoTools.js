const sortedCopy = (photos, compare) =>
  typeof photos.toSorted === "function"
    ? photos.toSorted(compare)
    : [...photos].sort(compare);

export const filterByPlace = (photos, place) => {
  const query = place.trim().toLocaleLowerCase();
  return query
    ? photos.filter((photo) => photo.place.toLocaleLowerCase().includes(query))
    : [...photos];
};

export const searchPhotos = (photos, query) => {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return normalizedQuery
    ? photos.filter((photo) =>
        [photo.title, photo.place, ...(photo.tags ?? [])]
          .filter(Boolean)
          .some((value) => value.toLocaleLowerCase().includes(normalizedQuery)),
      )
    : [...photos];
};

export const sortByDate = (photos, direction = "desc") => {
  const multiplier = direction === "asc" ? 1 : direction === "desc" ? -1 : 0;
  if (multiplier === 0) {
    throw new RangeError('direction must be "asc" or "desc".');
  }
  return sortedCopy(
    photos,
    (first, second) =>
      multiplier * (new Date(first.date).getTime() - new Date(second.date).getTime()),
  );
};

export const sortByLikes = (photos, direction = "desc") => {
  const multiplier = direction === "asc" ? 1 : direction === "desc" ? -1 : 0;
  if (multiplier === 0) {
    throw new RangeError('direction must be "asc" or "desc".');
  }
  return sortedCopy(photos, (first, second) => multiplier * (first.likes - second.likes));
};

export const topLikedPhotos = (photos, limit = 3) =>
  sortByLikes(photos).slice(0, Math.max(0, limit));

export const filterByTag = (photos, tag) => {
  const normalizedTag = tag.trim().toLocaleLowerCase();
  return normalizedTag
    ? photos.filter((photo) =>
        (photo.tags ?? []).some((item) => item.toLocaleLowerCase() === normalizedTag),
      )
    : [...photos];
};

export const photoTitles = (photos) => photos.map(({ title }) => title);

export const uniquePlaces = (photos) =>
  [...new Set(photos.map(({ place }) => place))];

export const groupByPlace = (photos) =>
  typeof Object.groupBy === "function"
    ? Object.groupBy(photos, ({ place }) => place)
    : photos.reduce(
        (groups, photo) => ({
          ...groups,
          [photo.place]: [...(groups[photo.place] ?? []), photo],
        }),
        {},
      );
