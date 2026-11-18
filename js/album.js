const clone = (value) =>
  typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));

const copyPhoto = (photo) => ({
  ...clone(photo),
  likes: Number.isFinite(photo.likes) ? photo.likes : 0,
  tags: Array.isArray(photo.tags) ? [...photo.tags] : [],
});

export class Album {
  #photos;

  constructor(photos = []) {
    if (!Array.isArray(photos)) {
      throw new TypeError("Album photos must be an array.");
    }

    this.#photos = photos.map(copyPhoto);
  }

  get size() {
    return this.#photos.length;
  }

  get photos() {
    return clone(this.#photos);
  }

  find(id) {
    const photo = this.#photos.find((item) => item.id === id);
    return photo ? clone(photo) : undefined;
  }

  add(photo) {
    if (!photo || typeof photo !== "object" || Array.isArray(photo)) {
      throw new TypeError("A photo must be an object.");
    }

    const nextPhoto = {
      ...clone(photo),
      id:
        photo.id === undefined || photo.id === null
          ? Math.max(0, ...this.#photos.map(({ id }) => Number(id) || 0)) + 1
          : photo.id,
      likes: 0,
      tags: [],
    };

    if (this.#photos.some((item) => item.id === nextPhoto.id)) {
      throw new RangeError(`A photo with id ${nextPhoto.id} already exists.`);
    }

    this.#photos = [...this.#photos, nextPhoto];
    return clone(nextPhoto);
  }

  remove(id) {
    const remaining = this.#photos.filter((photo) => photo.id !== id);
    if (remaining.length === this.#photos.length) {
      return false;
    }
    this.#photos = remaining;
    return true;
  }

  like(id) {
    const photo = this.#photos.find((item) => item.id === id);
    if (!photo) {
      return undefined;
    }

    this.#photos = this.#photos.map((item) =>
      item.id === id ? { ...item, likes: item.likes + 1 } : item,
    );
    return this.find(id);
  }

  toJSON() {
    return { photos: this.photos };
  }

  static from(json) {
    const parsed = typeof json === "string" ? JSON.parse(json) : clone(json);
    const photos = Array.isArray(parsed) ? parsed : parsed?.photos;
    if (!Array.isArray(photos)) {
      throw new TypeError("Album JSON must contain a photos array.");
    }
    return new Album(photos);
  }
}

export class FeaturedAlbum extends Album {
  get featuredPhotos() {
    return this.photos.filter(({ likes }) => likes >= 3);
  }

  like(id) {
    return super.like(id);
  }
}
