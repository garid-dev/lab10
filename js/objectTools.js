const clone = (value) =>
  typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));

export const clonePhoto = (photo) => clone(photo);

export const updatePhoto = (photo, updates) => ({
  ...photo,
  ...updates,
  tags: updates.tags ? [...updates.tags] : [...(photo.tags ?? [])],
});

export const omitPhotoField = (photo, field) => {
  const { [field]: omitted, ...remaining } = photo;
  return remaining;
};

export const renamePhotoField = (photo, from, to) => {
  const { [from]: value, ...remaining } = photo;
  return from in photo ? { ...remaining, [to]: value } : { ...photo };
};

export const addPhotoTags = (photo, ...tags) => ({
  ...photo,
  tags: [...new Set([...(photo.tags ?? []), ...tags])],
});

export const removePhotoTags = (photo, ...tags) => ({
  ...photo,
  tags: (photo.tags ?? []).filter((tag) => !tags.includes(tag)),
});

export const mergePhotoMetadata = (photo, metadata) => ({
  ...photo,
  metadata: { ...(photo.metadata ?? {}), ...metadata },
});

export const splitPhoto = ({ id, ...details }) => ({ id, details: { ...details } });
