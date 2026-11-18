import test from "node:test";
import assert from "node:assert/strict";
import { Album, FeaturedAlbum } from "./js/album.js";
import { average, applyN, clamp, compose, greet, makeCounter } from "./js/utils.js";
import {
  filterByPlace,
  filterByTag,
  groupByPlace,
  photoTitles,
  searchPhotos,
  sortByLikes,
  uniquePlaces,
} from "./js/photoTools.js";
import {
  addPhotoTags,
  mergePhotoMetadata,
  omitPhotoField,
  renamePhotoField,
} from "./js/objectTools.js";
import { findPhotoById, searchByTitle, sumLikes } from "./js/bugs.js";

const photos = [
  { id: 1, title: "Одтой шөнө", place: "Амстердам", date: "1889-01-01", likes: 1, tags: ["шөнө"] },
  { id: 2, title: "Мона Лиза", place: "Флоренц", date: "1503-01-01", likes: 2, tags: ["хөрөг"] },
];

test("utility functions handle empty input and repeat operations", () => {
  assert.equal(average(), 0);
  assert.equal(average(2, 4, 6), 4);
  assert.equal(applyN((value) => value * 2, 3, 1), 8);
  const counter = makeCounter(4);
  assert.deepEqual([counter(), counter()], [4, 5]);
});

test("photo filters return copies and blank search matches all photos", () => {
  assert.deepEqual(filterByPlace(photos, " "), photos);
  const result = searchPhotos(photos, "   ");
  assert.deepEqual(result, photos);
  assert.notStrictEqual(result, photos);
  assert.deepEqual(searchByTitle(photos, "   "), photos);
  assert.deepEqual(searchPhotos([], "   "), []);
});

test("photo sorting preserves the source and handles an empty list", () => {
  assert.deepEqual(sortByLikes([], "desc"), []);
  const sorted = sortByLikes(photos, "desc");
  assert.deepEqual(sorted.map(({ id }) => id), [2, 1]);
  assert.deepEqual(photos.map(({ id }) => id), [1, 2]);
});

test("groupByPlace groups photos without changing the source", () => {
  const groups = groupByPlace(photos);
  assert.deepEqual(groups.Amsterdam, [photos[0]]);
  assert.deepEqual(groups.Florenz, [photos[1]]);
  assert.equal(photos.length, 2);
});

test("album assigns the next id, applies defaults, and isolates nested data", () => {
  const album = new Album(photos);
  const input = { title: "Шинэ зураг", place: "Улаанбаатар", date: "2025-01-01", extra: { note: "эх" } };
  const added = album.add(input);
  assert.equal(added.id, 3);
  assert.equal(added.likes, 0);
  assert.deepEqual(added.tags, []);
  added.extra.note = "өөрчлөв";
  assert.equal(album.find(3).extra.note, "эх");
  assert.equal(input.id, undefined);
  assert.equal(album.size, 3);
});

test("repeated like actions each count once and featured photos appear at three likes", () => {
  const album = new FeaturedAlbum([{ ...photos[0], likes: 1 }]);
  assert.equal(album.like(1).likes, 2);
  assert.equal(album.featuredPhotos.length, 0);
  assert.equal(album.like(1).likes, 3);
  assert.equal(album.featuredPhotos.length, 1);
  assert.equal(album.like(1).likes, 4);
  assert.equal(album.featuredPhotos.length, 1);
});

test("photos getter and find return deep copies", () => {
  const album = new Album(photos);
  const exposed = album.photos;
  exposed[0].tags.push("гадаад");
  album.find(1).tags.push("өөрчлөлт");
  assert.deepEqual(album.find(1).tags, ["шөнө"]);
});

test("album JSON round-trips and remove reports whether an id existed", () => {
  const album = new Album(photos);
  const restored = Album.from(JSON.stringify(album));
  assert.deepEqual(restored.photos, album.photos);
  assert.equal(restored.remove(1), true);
  assert.equal(restored.remove(1), false);
  assert.equal(restored.size, 1);
});

test("object helpers do not mutate inputs and remove selected keys", () => {
  const original = { id: 1, title: "Зураг", tags: ["эх"] };
  assert.deepEqual(addPhotoTags(original, "шинэ", "эх").tags, ["эх", "шинэ"]);
  assert.deepEqual(omitPhotoField(original, "title"), { id: 1, tags: ["эх"] });
  assert.deepEqual(original.tags, ["эх"]);
});

test("bug fixes handle empty reductions and return null for missing photos", () => {
  assert.equal(sumLikes([]), 0);
  assert.equal(sumLikes([{ likes: 2 }, {}]), 2);
  assert.equal(findPhotoById(photos, 1), photos[0]);
  assert.equal(findPhotoById(photos, 999), null);
  assert.deepEqual(searchByTitle([], "зураг"), []);
});

test("clamp, greet, and compose follow their boundary and default behavior", () => {
  assert.equal(clamp(-1, 0, 5), 0);
  assert.equal(clamp(8, 0, 5), 5);
  assert.equal(greet(), "Сайн байна уу, Зочин!");
  assert.equal(compose((value) => value + 1, (value) => value * 2)(3), 7);
});

test("applying a function zero times returns the original value", () => {
  assert.equal(applyN((value) => value * 2, 0, 5), 5);
});

test("photo transformations preserve input and return expected collections", () => {
  assert.deepEqual(filterByTag(photos, "ХӨРӨГ"), [photos[1]]);
  assert.deepEqual(photoTitles(photos), ["Одтой шөнө", "Мона Лиза"]);
  assert.deepEqual(uniquePlaces(photos), ["Амстердам", "Флоренц"]);
  assert.deepEqual(photos[0].tags, ["шөнө"]);
});

test("groupByPlace handles an empty input without changing it", () => {
  const empty = [];
  const groups = groupByPlace(empty);
  assert.deepEqual(Object.keys(groups), []);
  const filtered = filterByTag(empty, "зураг");
  assert.notStrictEqual(filtered, empty);
  assert.deepEqual(filtered, []);
  assert.deepEqual(empty, []);
});

test("object renaming and metadata merging leave source data untouched", () => {
  const original = { id: 1, title: "Зураг", metadata: { camera: "A" } };
  assert.deepEqual(renamePhotoField(original, "title", "name"), {
    id: 1,
    name: "Зураг",
    metadata: { camera: "A" },
  });
  assert.deepEqual(mergePhotoMetadata(original, { lens: "B" }), {
    id: 1,
    title: "Зураг",
    metadata: { camera: "A", lens: "B" },
  });
  assert.deepEqual(original, { id: 1, title: "Зураг", metadata: { camera: "A" } });
});
