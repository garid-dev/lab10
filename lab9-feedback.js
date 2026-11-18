const moodSuggestions = {
  тайван: {
    title: "Тайван байгаагаа анзаарч, энэ мөчийг хадгалаарай.",
    text: "Энэ тайвныг бий болгосон нэг жижиг зүйлийг нэрлээд, түүндээ талархаарай.",
  },
  баяртай: {
    title: "Баяр хөөрөө мэдрэх зай өөртөө үлдээгээрэй.",
    text: "Энэ мэдрэмжийг төрүүлсэн зүйлээ тэмдэглэж эсвэл дотнын хүнтэйгээ хуваалцаарай.",
  },
  түгшүүртэй: {
    title: "Түгшүүр мэдрэх нь танд ямар нэг зүйл чухал байгааг илтгэж болно.",
    text: "Хөлөө газарт мэдэрч, амьсгалаа ажиглаад эргэн тойрноосоо нэг тайвшруулах зүйл олоорой.",
  },
  гунигтай: {
    title: "Гунигтай байгаагаа хүчээр өөрчлөх шаардлагагүй.",
    text: "Өөртөө зөөлөн хандаж, итгэдэг хүнтэйгээ ярилцах эсвэл амрах жижиг боломж гаргаарай.",
  },
  ядарсан: {
    title: "Ядарснаа анзаарсан нь өөртөө анхаарах эхлэл.",
    text: "Боломжтой бол нэг ажлаа хойшлуулж, ус уух эсвэл хэдэн минут амсхийхийг сонгоорой.",
  },
  ууртай: {
    title: "Уурлах мэдрэмж таны хэрэгцээ эсвэл хил хязгаарыг зааж байж болно.",
    text: "Хариу үйлдэл хийхээс өмнө завсарлага аваад, өөрт юу хэрэгтэй байгааг аюулгүйгээр бодоорой.",
  },
};

const moodButtons = document.querySelectorAll(".mood-option");
const moodResult = document.querySelector("#mood-result");

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const suggestion = moodSuggestions[button.dataset.mood];
    if (!suggestion) return;

    moodButtons.forEach((option) => option.setAttribute("aria-pressed", String(option === button)));
    moodResult.querySelector("strong").textContent = suggestion.title;
    moodResult.querySelector("p").textContent = suggestion.text;
  });
});

const searchInput = document.querySelector("#resource-search");
const resourceCards = [...document.querySelectorAll(".resource-card")];
const searchEmpty = document.querySelector("#search-empty");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLocaleLowerCase("mn");
  let visibleCount = 0;

  resourceCards.forEach((card) => {
    const matches = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase("mn").includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  searchEmpty.hidden = visibleCount > 0;
});

const authOverlay = document.querySelector("#auth-overlay");
const authForm = document.querySelector("#auth-form");
const authNameField = document.querySelector("#auth-name-field");
const authNameInput = document.querySelector("#auth-name");
const authPassword = document.querySelector("#auth-password");
const authTitle = document.querySelector("#auth-title");
const authDescription = document.querySelector("#auth-description");
const authSubmit = document.querySelector(".auth-submit");
const authStatus = document.querySelector("#auth-status");
const authTabs = [...document.querySelectorAll(".auth-tab")];
const authOpenButtons = document.querySelectorAll(".auth-open");
const authCloseButton = document.querySelector(".auth-close");
let authMode = "login";
let previouslyFocusedElement;

function setAuthMode(mode) {
  authMode = mode === "register" ? "register" : "login";
  const registering = authMode === "register";

  authTabs.forEach((tab) => tab.setAttribute("aria-pressed", String(tab.dataset.authMode === authMode)));
  authNameField.hidden = !registering;
  authNameInput.required = registering;
  authPassword.autocomplete = registering ? "new-password" : "current-password";
  authTitle.textContent = registering ? "Өөртөө зай гаргаарай" : "Тавтай морил";
  authDescription.textContent = registering
    ? "Өөртөө анхаарах аяллаа өөрийн хурдаар эхлүүлээрэй."
    : "Өөрийн орон зайдаа эргэн ирсэнд баяртай байна.";
  authSubmit.textContent = registering ? "Бүртгүүлэх" : "Нэвтрэх";
  authStatus.textContent = "";
}

function openAuth(mode) {
  previouslyFocusedElement = document.activeElement;
  setAuthMode(mode);
  authOverlay.hidden = false;
  document.body.classList.add("auth-open");
  authOverlay.querySelector(".auth-close").focus();
}

function closeAuth() {
  authOverlay.hidden = true;
  document.body.classList.remove("auth-open");
  authStatus.textContent = "";
  previouslyFocusedElement?.focus();
}

authOpenButtons.forEach((button) => {
  button.addEventListener("click", () => openAuth(button.dataset.authMode));
});

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => setAuthMode(tab.dataset.authMode));
});

authCloseButton.addEventListener("click", closeAuth);

authOverlay.addEventListener("click", (event) => {
  if (event.target === authOverlay) closeAuth();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !authOverlay.hidden) closeAuth();
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  authStatus.textContent = authMode === "register"
    ? "Демо хувилбар тул бүртгэл үүсгэсэнгүй. Таны нууц үгийг хадгалаагүй."
    : "Демо хувилбар тул нэвтрэх хүсэлт илгээгээгүй. Таны нууц үгийг хадгалаагүй.";
});
