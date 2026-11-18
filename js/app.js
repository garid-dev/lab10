import { FeaturedAlbum } from "./album.js";
import {
  filterByPlace,
  searchPhotos,
  sortByDate,
} from "./photoTools.js";
import { validateName } from "./validators.js";

const initialPhotos = [
  { id: 1, title: "Одтой шөнө", artist: "Винсент ван Гог", place: "Амстердам", date: "1889-06-01", imageUrl: "https://ergelt.mn/upload/images/13492928_the-starry-night-van-gogh-reproduction.jpg", likes: 3, tags: ["уран зураг"] },
  { id: 2, title: "Сувдан ээмэгт бүсгүй", artist: "Йоханнес Вермеер", place: "Делфт", date: "1665-01-01", imageUrl: "https://tse3.mm.bing.net/th/id/OIP.zmS9s2PUa8_zkrKzwgU7pgHaIx?r=0&pid=ImgDet&w=474&h=561&rs=1&o=7&rm=3", likes: 1, tags: ["хөрөг"] },
  { id: 3, title: "Канагавагийн их давалгаа", artist: "Кацушика Хокусай", place: "Япон", date: "1831-01-01", imageUrl: "https://i.pinimg.com/originals/a9/86/49/a98649efbbc59a66f0aca5894053517a.jpg", likes: 2, tags: ["далай"] },
  { id: 4, title: "Мона Лиза", artist: "Леонардо да Винчи", place: "Флоренц", date: "1503-01-01", imageUrl: "art-gallery-video-poster.jpg", likes: 0, tags: ["хөрөг"] },
  { id: 5, title: "Хашхираан", artist: "Эдвард Мунк", place: "Осло", date: "1893-01-01", imageUrl: "https://ergelt.mn/upload/images/MUSEUM-superJumbo.jpg", likes: 4, tags: ["уран зураг"] },
  { id: 6, title: "Үнсэлт", artist: "Густав Климт", place: "Вена", date: "1908-01-01", imageUrl: "https://ergelt.mn/upload/images/The-Kiss.jpg", likes: 1, tags: ["хайр"] },
  { id: 7, title: "Алжирийн эмэгтэйчүүд", artist: "Пабло Пикассо", place: "Алжир", date: "1955-01-01", imageUrl: "https://cdn.luxatic.com/wp-content/uploads/2019/02/Pablo-Picasso.jpg", likes: 0, tags: ["уран зураг"] },
  { id: 8, title: "Сүүлчийн зоог", artist: "Леонардо да Винчи", place: "Милан", date: "1498-01-01", imageUrl: "https://images.immediate.co.uk/production/volatile/sites/7/2021/03/GettyImages-550119221-e490377.jpg", likes: 0, tags: ["уран зураг"] },
];

const album = new FeaturedAlbum(initialPhotos);
const grid = document.querySelector("#photo-grid");
const searchInput = document.querySelector("#search");
const placeInput = document.querySelector("#place-filter");
const sortInput = document.querySelector("#sort-order");
const form = document.querySelector("#photo-form");
const formStatus = document.querySelector("#form-status");
const countLabel = document.querySelector("#photo-count");

export function currentList() {
  const matchingPlace = filterByPlace(album.photos, placeInput.value);
  const matchingSearch = searchPhotos(matchingPlace, searchInput.value);
  return sortByDate(matchingSearch, sortInput.value);
}

export function makeCard(photo) {
  const card = document.createElement("article");
  card.className = "photo-card";
  card.dataset.photoId = photo.id;

  const image = document.createElement("img");
  image.src = photo.imageUrl || "art-gallery-video-poster.jpg";
  image.alt = photo.title;
  image.loading = "lazy";
  image.addEventListener(
    "error",
    () => {
      const fallback = document.createElement("div");
      fallback.className = "photo-card__image-fallback";
      fallback.setAttribute("role", "img");
      fallback.setAttribute("aria-label", `${photo.title} зургийг ачаалж чадсангүй`);
      fallback.textContent = "Зураг түр ачаалсангүй";
      image.replaceWith(fallback);
    },
    { once: true },
  );

  const content = document.createElement("div");
  content.className = "photo-card__content";

  const heading = document.createElement("h3");
  heading.textContent = photo.title;
  const detail = document.createElement("p");
  detail.textContent = `${photo.artist ? `${photo.artist} · ` : ""}${photo.place} · ${photo.date.slice(0, 4)}`;
  const credit = document.createElement("a");
  credit.className = "photo-card__credit";
  credit.href = "lab9.html#gallery";
  credit.target = "_blank";
  credit.rel = "noreferrer";
  credit.textContent = "Lab 9-ийн зургийн эх сурвалж ↗";
  const actions = document.createElement("div");
  actions.className = "photo-card__actions";
  const likeButton = document.createElement("button");
  likeButton.type = "button";
  likeButton.className = "like-button";
  likeButton.dataset.likeId = photo.id;
  likeButton.setAttribute("aria-label", `${photo.title} зурагт таалагдлаа`);
  likeButton.textContent = `♥ ${photo.likes}`;
  if (album.featuredPhotos.some(({ id }) => id === photo.id)) {
    const featuredBadge = document.createElement("span");
    featuredBadge.className = "photo-card__featured";
    featuredBadge.textContent = "★ Онцлох";
    card.append(featuredBadge);
  }
  const tagList = document.createElement("span");
  tagList.className = "photo-card__tags";
  tagList.textContent = photo.tags.map((tag) => `#${tag}`).join(" ");

  actions.append(likeButton, tagList);
  content.append(heading, detail, credit, actions);
  card.append(image, content);
  return card;
}

export function renderCards(photos) {
  grid.replaceChildren(...photos.map(makeCard));
  countLabel.textContent = `${photos.length} зураг`;
  grid.setAttribute("aria-label", `Цомогт ${photos.length} зураг байна`);
}

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-like-id]");
  if (!button) {
    return;
  }
  album.like(Number(button.dataset.likeId));
  renderCards(currentList());
});

for (const control of [searchInput, placeInput, sortInput]) {
  control.addEventListener("input", () => renderCards(currentList()));
  control.addEventListener("change", () => renderCards(currentList()));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = form.elements.title.value.trim();
  const place = form.elements.place.value.trim();
  const date = form.elements.date.value;
  const parsedDate = new Date(`${date}T00:00:00Z`);
  const validDate =
    /^\d{4}-\d{2}-\d{2}$/u.test(date) &&
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date;

  if (!validateName(title) || !validateName(place) || !validDate) {
    formStatus.textContent = "Нэр, газар 2–50 тэмдэгттэй, огноо зөв байна уу шалгана уу.";
    formStatus.className = "form-status form-status--error";
    return;
  }

  album.add({ title, place, date });
  form.reset();
  formStatus.textContent = "Зургийг цомогт нэмлээ.";
  formStatus.className = "form-status form-status--success";
  renderCards(currentList());
});

renderCards(currentList());
